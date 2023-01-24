const test = require('ava');
const plugin = require('../index');

const eleventyMockFactory = () => {
  return {
    wasCalled: false,
    callTimes: 0,
    filters: {},
    addFilter: function (filterName, fn) {
      this.wasCalled = true;
      this.callTimes++;
      this.filters[filterName] = fn;
    }};
};

test('calls addFilter x2', t => {
  const eleventyMock = eleventyMockFactory();

  t.false(eleventyMock.wasCalled);
  plugin(eleventyMock)
  t.true(eleventyMock.callTimes === 2);
});
