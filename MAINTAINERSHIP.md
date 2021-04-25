ChangelogAutomation.action Maintainership
=========================================

Release
-------

To release a new version:
1. Update the project status in the `README.md` file, if required.
2. Update the copyright year in the `LICENSE.md` file, if required.
3. Choose the new version according to [Semantic Versioning][semver]. It should consist of three numbers (e.g. `1.0.0`).
4. Update the `version` field in the `package.json` file.
5. Update the contents of the `version` and `packageData` variables in the `main.js` file, if the main tool version should be updated.
6. Run `npm ci && npm run build`.
7. Make sure there's a properly formed version entry in the `CHANGELOG.md` file.
8. Merge the changes via a pull request.
9. Push a tag named `v<VERSION>` to GitHub.
10. Create a new [release][releases] on GitHub.
11. Make sure to also update the current rolling major release (say, `v1`) to the new version.

[semver]: https://semver.org/spec/v2.0.0.html
[releases]: https://github.com/ForNeVeR/ChangelogAutomation.action/releases
