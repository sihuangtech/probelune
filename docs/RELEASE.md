# Release procedure / 发布流程

All repositories and Go dependencies use `v0.1.0`, including certificate-lifetime assertions. The maintainer explicitly republished this tag with the current implementation. Release notes are maintained on GitHub; local changelogs are removed and ignored.

1. Review the relevant README, GitHub Release notes, security policy and lockfile changes. Check that no real `.env`, credentials, database, node identity, private targets or generated signing material are staged.
2. Run that repository's formatter, static checks and build. Go release builds use `GOWORK=off`. Record UI, runtime, container and device evidence separately.
3. Verify the dashboard/node pair against the chosen contract version. For an upgrade, take and restore-test a database/key backup before replacing a deployment.
4. Commit and push the intended branch to its own `sihuangtech` repository. Compare local HEAD to `git ls-remote origin refs/heads/BRANCH` and read CI for that exact commit.
5. Create immutable version tags after validation. Attach generated binaries/images only with clear platform, version and signing status. CI debug APKs are validation artifacts, not store-ready releases.
6. For signed desktop/mobile distribution, configure maintainer-owned credentials outside Git and complete the real-device/provider checks in [acceptance](acceptance.md).

The root documentation repo ignores all child source trees, `go.work` and `.runtime`. A release is not a reason to add them as submodules or flatten their histories. The desktop remote has been renamed; its existing `master` branch/history are retained. New repositories use `main`.

Open-source files in each project: English-default `README.md`, `README.zh-CN.md`, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue/PR templates and CI. Environment-specific operational and release instructions live with the project that owns them.

Release notes are maintained on GitHub Releases in English. `CHANGELOG*`, `Changelog*` and `changelog*` files are ignored in every repository. The v0.1.0 tags were updated to the consolidated release commits at the maintainer's request. Releases may contain source archives only; attach prebuilt binaries only when explicitly built and validated for their stated platform.
