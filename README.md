ChangelogAutomation.action [![Status Zero][status-zero]][andivionian-status-classifier]
==========================

When preparing a software release, a common task is to parse [the changelog file][keep-a-changelog], and extract the latest changes section from it. For certain purposes, Markdown format is acceptable, but in some cases a text format is also useful.

ChangelogAutomation.action is a GitHub action that uses [ChangelogAutomation][changelogautomation] to parse the changelog and provide the output to reuse in a GitHub Actions context.

Usage
-----

TBD.

Development
-----------

To build the project distribution (which is then pushed to the repository, [as recommended by GitHub][github-docs]), run the following shell command:

```console
$ npm run build
```

Documentation
-------------

- [Changelog][changelog]
- [Maintainership][maintainership]
- [License][license] (MIT)

[andivionian-status-classifier]: https://github.com/ForNeVeR/andivionian-status-classifier#status-zero-
[changelog]: ./CHANGELOG.md
[github-docs]: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github
[keep-a-changelog]: http://keepachangelog.com/
[license]: ./LICENSE.md
[maintainership]: ./MAINTAINERSHIP.md

[status-zero]: https://img.shields.io/badge/status-zero-lightgrey.svg
