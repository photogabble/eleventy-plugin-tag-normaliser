const test = require('ava');
const {TagAtlas, strToSlug, slugToStr} = require('../src/tag-atlas');
const slugify = require('../src/str-to-slug');

test('does not split titleCase or change case for ignored words', t => {
  const tagAtlas = new TagAtlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript', 'MS-DOS'],
  });

  const checks = {
    'PHP':'PHP',
    'php':'PHP',
    'JavaScript': 'JavaScript',
    'javascript': 'JavaScript',
    'MS-DOS': 'MS-DOS',
    'ms-dos': 'MS-DOS'
  };

  for (const [input, expected] of Object.entries(checks)) {
    const result = tagAtlas.find(input);
    t.true(result.title === expected, `[${result.title}] does not match "${expected}"`)
  }
});

test('merges tags defined as similar', t => {
  const tagAtlas = new TagAtlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript'],
    similar: {'Game Development': ['GameDev']},
  });

  const checks = ['Game Development', 'GameDevelopment', 'Game Dev', 'GameDev'];

  for (const check of checks) {
    t.true(tagAtlas.find(check) !== undefined, `[${check}] should be defined`);

    t.true(tagAtlas.find(check).slug === 'game-development', `The slug of [${check}] should be game-development`)
  }
});

test('unknown tags return undefined', t => {
  const tagAtlas = new TagAtlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript'],
    similar: {'Game Development': ['GameDev']},
  });

  t.is(tagAtlas.find('hello world'), undefined);
});

test('splitTitle correctly splits words', t => {
  const tagAtlas = new TagAtlas({slugify});
  const checks = {
    '11ty': '11ty',
    'DOS': 'DOS',
    'JS': 'JS',
    'JavaScript': 'Java Script',
    'HelloWorld': 'Hello World',
    'GameDevelopment': 'Game Development',
    'PDFSplitAndMergeSamples': 'PDF Split And Merge Samples',
  };

  for (const [input, expected] of Object.entries(checks)) {
    const result = tagAtlas.splitTitle(input);
    t.is(result, expected);
  }
});

test('find returns undefined on empty input', t => {
  const tagAtlas = new TagAtlas({slugify});
  t.is(tagAtlas.find(), undefined);
})

test('strToSlug works correctly when tile atlas given no config options', t => {
  const tagAtlas = new TagAtlas({slugify});
  const fn = strToSlug(tagAtlas);
  const checks = {
    '11ty': '11ty',
    'DOSCember': 'dos-cember',
    'DOS': 'dos',
    'MS-DOS': 'ms-dos',
  };

  for (const [input, output] of Object.entries(checks)) {
    t.is(fn(input), output);
  }
});

test('slugToStr works correctly when tile atlas given no config options', t => {
  const tagAtlas = new TagAtlas({slugify});
  const fn = slugToStr(tagAtlas);
  const checks = {
    '11ty': '11ty',
    'doscember': 'Doscember',
    'dos': 'Dos',
    'js': 'Js',
    'php': 'Php',
    'javascript': 'Javascript',
    'ms-dos': 'Ms Dos', // heh, but it's not aware that MS-DOS is an ignored input
  };

  for (const [input, output] of Object.entries(checks)) {
    t.is(fn(input), output);
  }
});

test('slugToStr returns the split title from strToSlug', t => {
  const tagAtlas = new TagAtlas({slugify});
  const stringToSlug = strToSlug(tagAtlas);
  const slugToString = slugToStr(tagAtlas);

  // Because tagAtlas has been taught JavaScript before javascript, it should register the lowercase variety
  // as linked to the camelcase.
  const checks = {
    'JavaScript': 'Java Script',
    'javascript': 'Java Script',
  };

  for (const [input, expected] of Object.entries(checks)) {
    const slug = stringToSlug(input);
    const result = slugToString(slug);
    t.is(result, expected);
  }
})

test('lowercase variants added on creation', t => {
  const tagAtlas = new TagAtlas({slugify});

  // This should create two records, one for "JavaScript" and one for "javascript".
  tagAtlas.findOrCreateByTitle('JavaScript');
  t.is(tagAtlas.find('JavaScript').title, tagAtlas.find('javascript').title);

  tagAtlas.findOrCreateByTitle('DOS');
  t.is(tagAtlas.find('DOS').title, tagAtlas.find('dos').title);
})

test('nesting of similar tags limited to two deep', t => {
  const tagAtlas = new TagAtlas({slugify, similar: {'Game Development': ['GameDev']}});

  const lowercaseChild = tagAtlas.tags.find(t => t.slug === 'gamedev');
  const child = tagAtlas.tags.find(t => t.slug === 'game-dev');
  const parent = tagAtlas.tags.find(t => t.slug === 'game-development');

  t.is(lowercaseChild.is, parent);
  t.is(child.is, parent);
  t.is(parent.is, undefined);
});
