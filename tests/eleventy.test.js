const test = require('ava');
const plugin = require('../index');
const {atlas} = require('../src/tag-atlas');

const eleventyMockFactory = () => {
  return {
    calls: {
      addFilter: 0,
      addGlobalData: 0,
    },

    wasCalled: false,
    callTimes: 0,
    filters: {},
    globalData: {},
    addFilter: function (filterName, fn) {
      this.calls.addFilter++;
      this.filters[filterName] = fn;
    },
    addGlobalData: function (key, value) {
      this.calls.addGlobalData++;
      this.globalData[key] = value;
    }
  };
};

test('validates configuration', t => {
  t.deepEqual(Object.keys(plugin.validateOptions({})), []);
  t.deepEqual(Object.keys(plugin.validateOptions({ignore: 'abc'})), []);
  t.deepEqual(Object.keys(plugin.validateOptions({ignore: ['abc']})), ['ignore']);
  t.deepEqual(Object.keys(plugin.validateOptions({similar: ['abc']})), ['similar']);
  t.deepEqual(Object.keys(plugin.validateOptions({slugify: ''})), []);
  t.deepEqual(Object.keys(plugin.validateOptions({slugify: () => {}})), ['slugify']);
});

test('calls addFilter x2', t => {
  const eleventyMock = eleventyMockFactory();

  t.is(eleventyMock.calls.addFilter, 0);
  plugin(eleventyMock)
  t.is(eleventyMock.calls.addFilter, 2);
});

test('make tagAtlas available as eleventy global data', t => {
  const eleventyMock = eleventyMockFactory();

  t.is(eleventyMock.calls.addGlobalData, 0);
  plugin(eleventyMock)
  t.is(eleventyMock.calls.addGlobalData, 1);

  t.true(eleventyMock.globalData['tagAtlas'] === atlas());
})
