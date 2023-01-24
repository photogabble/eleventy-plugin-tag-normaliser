# Tag Normaliser Plugin

A light library for making available `strToSlug` and `slugToStr` filters to your [Eleventy](https://www.11ty.dev/)
powered project.

## Install

```
npm i @photogabble/eleventy-plugin-tag-normaliser
```

## Usage

In your Eleventy config file (defaults to `.eleventy.js`):

```js
module.exports = (eleventyConfig) => {
  const config = {
    ignore: ['JavaScript', 'PHP'],
    similar: {'JavaScript': ['JS']},
  };
  eleventyConfig.addPlugin(require('@photogabble/eleventy-plugin-tag-normaliser'), config);
};
```

You will now have `strToSlug` and `slugToStr` filters available for use in your templates.

## Configuration
```ts
interface Options {
  ignore: Array<string>;
  similar: Record<string, Array<string>>;
}
```

### Ignored Tags
These tags will not be modified by the tag atlas when converting from slug to string, it also excludes tags from being split by capitalisation, for example these will all eval as true:

```js
// ignore: ['JavaScript', 'JS'],

strToSlug('JS') === 'js';
slugToStr('js') === 'JS';

strToSlug('JavaScript') === 'javascript';
slugToStr('javascript') === 'JavaScript';
```

### Similar Tags

```js
// similar: {'JavaScript': ['JS']},

strToSlug('JS') === 'java-script';
slugToStr('js') === 'Java Script';

strToSlug('JavaScript') === 'java-script';
slugToStr('java-script') === 'Java Script';
```

From the above you can see why you would want to combine `ignore: ['JavaScript', 'JS']` so that `java-script` did not become `Java Script`.

## License
This 11ty plugin is open-sourced software licensed under the [MIT License](LICENSE)
