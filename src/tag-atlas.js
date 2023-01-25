class TagAtlas {
  constructor(config) {
    this.tags = [];
    this.ignored = config.ignore || [];
    this.slugify = config.slugify;

    if (config.ignore) {
      // ignore: ['PHP', 'JS', 'JavaScript'] - getTitle will return matches as these regardless of input
      // case e.g. php -> PHP, javascript -> JavaScript
      for (const tag of config.ignore) {
        this.tags.push({
          title: tag,
          slug: this.slugify(tag)
        });
      }
    }

    if (config.similar) {
      // similar: {'Game Development': ['GameDev']} - GameDev will always link to Game Development
      for (const tag of Object.keys(config.similar)) {
        const mainTag = this.findOrCreateByTitle(tag);

        for (const similarTag of config.similar[tag]) {
          this.findOrCreateByTitle(similarTag, mainTag)
        }
      }
    }
  }

  splitTitle(title) {
    if (this.ignored.find(i => i.toLowerCase() === title.toLowerCase())) return title;

    const splitTitle = title.match(/[A-Z][a-z]+|[0-9]+/g);
    return (splitTitle) ? splitTitle.join(" ") : title;
  }

  // Lookup by title
  find(title) {
    if (!title) return undefined;
    return this.findBySlug(this.slugify(this.splitTitle(title)), true);
  }

  // Lookup by slug
  findBySlug(slug, followSimilar = false) {
    const found = this.tags.find(t => t.slug === slug);
    if (found && followSimilar && found.is) return found.is;
    return found;
  }

  // Lookup by title
  findOrCreateByTitle(title, is) {
    title = this.splitTitle(title);
    const slug = this.slugify(title);
    const found = this.findBySlug(slug);

    if (found) return found;

    const tag = {title, slug, is};
    this.tags.push(tag);

    return tag;
  }

  findOrCreateBySlug(slug, followSimilar = false) {
    const found = this.findBySlug(slug, followSimilar);
    if (found) return found;

    const title = slug
      .toLowerCase()
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ')

    const tag = {title, slug};
    this.tags.push(tag);
    return tag;
  }
}

// Memoized copy of TagAtlas, the plugin will populate this as soon as Eleventy loads the plugin.
let atlas;

// Memoize atlas if not already set, or if set, and we have config provided.
const memoize = (config) => {
  if (!atlas || config) atlas = new TagAtlas(config);
  return atlas;
}

module.exports = {
  atlas: memoize,
  strToSlug: (atlas) => (str) => atlas.findOrCreateBySlug(str).slug,
  slugToStr: (atlas) => (slug) => atlas.findOrCreateBySlug(slug, true).title,
}
