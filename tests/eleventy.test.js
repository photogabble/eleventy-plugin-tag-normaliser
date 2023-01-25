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

test('calls addFilter x2', t => {
  const eleventyMock = eleventyMockFactory();

  t.true(eleventyMock.calls.addFilter === 0);
  plugin(eleventyMock)
  t.true(eleventyMock.calls.addFilter === 2);
});

test('make tagAtlas available as eleventy global data', t => {
  const eleventyMock = eleventyMockFactory();

  t.true(eleventyMock.calls.addGlobalData === 0);
  plugin(eleventyMock)
  t.true(eleventyMock.calls.addGlobalData === 1);

  t.true(eleventyMock.globalData['tagAtlas'] === atlas());
})
