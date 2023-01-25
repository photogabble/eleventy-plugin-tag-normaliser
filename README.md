# Tag Normaliser Plugin

A lightweight library for making available `strToSlug` and `slugToStr` filters to your [Eleventy](https://www.11ty.dev/) powered project. Behind the scenes there is a configurable "Tag Atlas" that keeps track of and normalises your tags.

This is known to work against [v1.0.2 of Eleventy](https://github.com/11ty/eleventy/releases/tag/v1.0.2).

## Install

```
npm i @photogabble/eleventy-plugin-tag-normaliser
```

## Configuration

The tag atlas provides three configuration options: `ignore`, `similar` and `slugify`.

```ts
interface Options {
  slugify: Function;
  ignore: Array<string>;
  similar: Record<string, Array<string>>;
}
```

### Slugify
By default, this library depends upon the [slugify](https://www.npmjs.com/package/slugify) library for providing the string to slug functionality. If you already have your own function or configured instance of slufify for your project that you would rather use then you may pass that through via this attribute, else, slugify will be loaded with the following options:

```js
const options = {
  lower: true,
  replacement: '-',
  remove: /[&,+()$~%.'":*?!<>{}#/]/g,
};
```

### Ignored Tags

These are tags that you do not want the tag atlas to modify when converting from slug to string. For example `DOScember` will by default become `dos-cember` excluding it will ensure the slug becomes `doscember` and the title remains `DOScember`.

For example these will all eval as true:

```js
// ignore: ['JavaScript', 'JS'],

strToSlug('JS') === 'js';
slugToStr('js') === 'JS';

strToSlug('JavaScript') === 'javascript';
slugToStr('javascript') === 'JavaScript';
```

### Similar Tags

This is how you teach the Tag Atlas tag similarity. For example, you might want all instances of `JS` to point to `JavaScript`.

```js
// similar: {'JavaScript': ['JS']},

strToSlug('JS') === 'java-script';
slugToStr('js') === 'Java Script';

strToSlug('JavaScript') === 'java-script';
slugToStr('java-script') === 'Java Script';
```

From the above you can see why you would want to combine `ignore: ['JavaScript']` so that `java-script` did not become `Java Script`.

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

You will now have `strToSlug` and `slugToStr` filters available for use in your templates as well as a memoized instance of the `TagAtlas` available as global data via the `tagAtlas` value. For example:

```js
const atlas = eleventyConfig.globalData.tileAtlas;
```

## License
This 11ty plugin is open-sourced software licensed under the [MIT License](LICENSE)
