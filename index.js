const {atlas, slugToStr, strToSlug} = require('./src/tag-atlas');

const defaultOptions = {
  ignore: [],
  similar: {}
};

const validateOptions = (options) => {
  let validated = {};
  for (let [key, value] of Object.entries(options)) {
    key = key.toLowerCase();
    switch (key) {
      case 'ignore':
        if (Array.isArray(value)) validated.ignore = value;
        break;
      case 'similar':
        validated.similar = value;
        break;
    }
  }
  return validated;
};


module.exports = function (eleventyConfig, customOptions = {}) {
  const globalOptions = Object.assign({}, defaultOptions, validateOptions(customOptions));
  const tagAtlas = atlas(globalOptions);

  eleventyConfig.addFilter('strToSlug', strToSlug(tagAtlas));
  eleventyConfig.addFilter('slugToString', slugToStr(tagAtlas));
};
