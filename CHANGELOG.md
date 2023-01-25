# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2023-01-25

### Added

- Make tileAtlas available via the [Eleventy global data API](https://www.11ty.dev/docs/data-global-custom/)

## [1.0.1] - 2023-01-24

### Fixed

- Wasn't passing through slugify to the tag atlas, missed by tests.

## [1.0.0] - 2023-01-24

### Added
- Initial version of this 11ty plugin providing `strToSlug` and `slugToStr` helper methods backed by a tag atlas class which acts to deduplicate and normalise tags.
