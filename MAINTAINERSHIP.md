ChangelogAutomation.action Maintainership
=========================================

Release
-------

To release a new version:
1. Update the project status in the `README.md` file, if required.
2. Update the copyright year in the `LICENSE.md` file, if required.
3. Choose the new version according to [Semantic Versioning][semver]. It should consist of three numbers (e.g. `1.0.0`).
4. Update the `version` field in the `package.json` file.
5. Update the contents of the `version` and `packageData` variables in the `main.js` file, if the ChangelogAutomation dotnet tool version should be updated.

   To do this, use the `scripts/Update-ToolVersion.ps1` script.
6. Run `npm ci && npm run build`.
7. Make sure there's a properly formed version entry in the `CHANGELOG.md` file.
8. Merge the changes via a pull request.
9. Push a tag named `v<VERSION>` to GitHub.
10. Create a new [release][releases] on GitHub.
    - Release title should be "ChangelogAutomation.action v<VERSION>"
    - Release notes could be copy-pasted from the `CHANGELOG.md` file
11. Make sure to also update the current rolling major release tag (say, `v1`) to the new version.

[semver]: https://semver.org/spec/v2.0.0.html
[releases]: https://github.com/ForNeVeR/ChangelogAutomation.action/releases
