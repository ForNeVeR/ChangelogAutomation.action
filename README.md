ChangelogAutomation.action [![Status Terrid][status-terrid]][andivionian-status-classifier]
==========================

When preparing a software release, a common task is to parse [the changelog file][keep-a-changelog], and extract the latest changes section from it. For certain purposes, Markdown format is acceptable, but in some cases a text format is also useful.

ChangelogAutomation.action is a GitHub action that uses [ChangelogAutomation][changelogautomation] to parse the changelog and provide the output to reuse in a GitHub Actions context.

Usage
-----

Add the following to your `.github/workflows/<workflow>.yml`:

```yaml
jobs:
  <job>:
    steps:
      - name: Test Markdown
        uses: ForNeVeR/ChangelogAutomation.action@v2
        with:
          input: ./smth/CHANGELOG.md
          output: ./changelog-section.md
```

This will read the latest version section of your `CHANGELOG.md` file and save it to the `changelog-section.md` file.

Available input parameters are:

- `input` (`./CHANGELOG.md` by default): the input changelog file
- `format` (`Markdown` by default): output file format; either `Markdown` or `PlainText`
- `output`: the output file where the section content will be written

Development
-----------

Node.js v20.0+ and NPM 10.0+ are required to work on this project.

To download the dependencies, run the following shell command:

```console
$ npm install
```

To build the project distribution (which is then pushed to the repository, [as recommended by GitHub][github-docs]), run the following shell command:

```console
$ npm run build
```

Documentation
-------------

- [Changelog][changelog]
- [Maintainership][maintainership]
- [License][license] (MIT)
- see also [the ChangelogAutomation documentation][changelogautomation]

[andivionian-status-classifier]: https://andivionian.fornever.me/v1/#status-terrid-
[changelog]: ./CHANGELOG.md
[changelogautomation]: https://github.com/ForNeVeR/ChangelogAutomation
[github-docs]: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github
[keep-a-changelog]: http://keepachangelog.com/
[license]: ./LICENSE.md
[maintainership]: ./MAINTAINERSHIP.md
[status-terrid]: https://img.shields.io/badge/status-terrid-green.svg
