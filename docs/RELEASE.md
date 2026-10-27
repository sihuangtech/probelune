# Release procedure / 发布流程

Each repository releases independently. Dashboard/node/mobile start at 0.1.0; desktop continues at 1.6.0; the contracts dependency is v0.1.1 and protocol remains v1. Never move an existing published tag.

1. Review the relevant README, changelog, security policy and lockfile changes. Check that no real `.env`, credentials, database, node identity, private targets or generated signing material are staged.
2. Run that repository's formatter, static checks and build. Go release builds use `GOWORK=off`. Record UI, runtime, container and device evidence separately.
3. Verify the dashboard/node pair against the chosen contract version. For an upgrade, take and restore-test a database/key backup before replacing a deployment.
4. Commit and push the intended branch to its own `sihuangtech` repository. Compare local HEAD to `git ls-remote origin refs/heads/BRANCH` and read CI for that exact commit.
5. Create immutable version tags after validation. Attach generated binaries/images only with clear platform, version and signing status. CI debug APKs are validation artifacts, not store-ready releases.
6. For signed desktop/mobile distribution, configure maintainer-owned credentials outside Git and complete the real-device/provider checks in [acceptance](acceptance.md).

The root documentation repo ignores all child source trees, `go.work` and `.runtime`. A release is not a reason to add them as submodules or flatten their histories. The desktop remote has been renamed; its existing `master` branch/history are retained. New repositories use `main`.

Open-source files in each project: English-default `README.md`, `README.zh-CN.md`, LICENSE, CHANGELOG, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue/PR templates and CI. Environment-specific operational and release instructions live with the project that owns them.
