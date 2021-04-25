ChangelogAutomation.action Maintainership
=========================================

Release
-------

To release a new version:
1. Update the copyright year in the `LICENSE.md` file, if required.
2. Choose the new version according to [Semantic Versioning][semver]. It should consist of three numbers (e.g. `1.0.0`).
3. Update the `version` field in the `package.json` file.
4. Update the contents of the `version` and `packageData` variables in the `main.js` file, if the main tool version should be updated.
5. Make sure there's a properly formed version entry in the `CHANGELOG.md` file.
6. Merge the changes via a pull request.
7. Push a tag named `v<VERSION>` to GitHub.
8. Create a new [release][releases] on GitHub.
9. Make sure to also update the current rolling major release (say, `v1`) to the new version.

[semver]: https://semver.org/spec/v2.0.0.html
[releases]: https://github.com/ForNeVeR/ChangelogAutomation.action/releases
