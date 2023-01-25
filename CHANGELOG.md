# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- (#1b6b7737) Limited similar depth to two deep, for example: `gamedev` and `game-dev` now can map to `game-development` whereas before `gamedev` would map to `game-dev` which mapped to `game-development`

### Fixed

- (#29053958) Removed double space from sometimes appearing in title's

## [1.0.3] - 2023-01-25

### Added

- `TagAtlas` now made available in module export

### Fixed

- `strToSlug` helper should be using `findOrCreateByTitle`
- Automatically ignore splitting any title that's all uppercase or all lowercase
- Tests where sharing the same instance of `TagAtlas` which polluted their environment and caused unexpected behaviour

## [1.0.2] - 2023-01-25

### Added

- Make tileAtlas available via the [Eleventy global data API](https://www.11ty.dev/docs/data-global-custom/)

## [1.0.1] - 2023-01-24

### Fixed

- Wasn't passing through slugify to the tag atlas, missed by tests.

## [1.0.0] - 2023-01-24

### Added
- Initial version of this 11ty plugin providing `strToSlug` and `slugToStr` helper methods backed by a tag atlas class which acts to deduplicate and normalise tags.

[unreleased]: https://github.com/photogabble/eleventy-plugin-tag-normaliser/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/photogabble/eleventy-plugin-tag-normaliser/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/photogabble/eleventy-plugin-tag-normaliser/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/photogabble/eleventy-plugin-tag-normaliser/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/photogabble/eleventy-plugin-tag-normaliser/releases/tag/v1.0.0
