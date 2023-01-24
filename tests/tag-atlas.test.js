const test = require('ava');
const {atlas} = require('../src/tag-atlas');
const slugify = require('../src/str-to-slug');

test('does not split titleCase or change case for ignored words', t => {
  const tagAtlas = atlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript'],
    similar: {'Game Development': ['GameDev']},
  });

  t.true(tagAtlas.find('PHP').title === 'PHP');
  t.true(tagAtlas.find('php').title === 'PHP');
  t.true(tagAtlas.find('JavaScript').title === 'JavaScript');
  t.true(tagAtlas.find('javascript').title === 'JavaScript');
});

test('merges tags defined as similar', t => {
  const tagAtlas = atlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript'],
    similar: {'Game Development': ['GameDev']},
  });

  for (const check of ['Game Development', 'GameDevelopment', 'Game Dev', 'GameDev']) {
    t.true(tagAtlas.find(check) !== undefined, `[${check}] should be defined`);
    t.true(tagAtlas.find(check).slug === 'game-development', `The slug of [${check}] should be game-development`)
  }
});

test('unknown tags return undefined', t => {
  const tagAtlas = atlas({
    slugify,
    ignore: ['PHP', 'JS', 'JavaScript'],
    similar: {'Game Development': ['GameDev']},
  });

  t.true(tagAtlas.find('hello world') === undefined, `[[hello world] should be undefined`);
});
