# Implementation decisions / 实现决策

Date: 2026-10-28. These choices implement the PRD's initial release rather than adding a hosted SaaS or public probe marketplace.

| Concern | Decision and reason |
| --- | --- |
| Repositories | Five independent product/protocol repos plus one documentation repo; web and backend share dashboard. |
| Web | Vue 3, TypeScript, Vite, Element Plus and ECharts; existing desktop knowledge is reusable without sharing renderer state. |
| Backend | Go/Gin and SQLite; single-process deployment avoids requiring Redis/queues/database services for a small installation. |
| Node | Go, outbound polling, bounded structured checks; Linux amd64/arm64 build targets. |
| Desktop | Retain Electron/Vue and history, fix local execution/TLS/DNS first, then add a separate dashboard adapter. |
| Mobile | Flutter Android/iOS; secure per-instance sessions/cache, incident handling and in-app rechecks. |
| Push | Deployer-owned Firebase/APNs, direct server delivery; no shared secrets or separately operated gateway. |
| Services | Monitor name/group/tags carry the initial service model; no empty mandatory parent hierarchy. |
| Polling | Web 3 seconds, mobile overview 8 seconds, node 2 seconds; long checks use submit/query/cancel. |
| Retention | Raw 7 days, 5-minute buckets 90 days, hourly 365 days, events/audit 180 days by default. |
| Distribution | GPL-3.0-or-later preserves desktop licensing; English default README and Chinese companion in every repo. |

## Official tools and compatibility

New projects used official current scaffolding (`npm create vue@latest`, `go mod init`, `flutter create`) in the workspace's child directories. Dependencies were managed through npm, Go and Flutter commands. Desktop npm ranges were updated using `npm-check-updates` followed by npm installation. Lockfiles are committed; no private dependency mirror or sibling source checkout is required for release builds.

TypeScript 7 exposed incompatibilities in Vue's typecheck/lint integration. The chosen replacement is the native TypeScript bridge used by official create-vue `--tsgo`, not an old compiler pin. Its Linux native library needs glibc, so the Docker web build uses official Node 26 Debian; the final Go runtime remains a small Alpine image. The upstream explanation of [Node image variants](https://github.com/nodejs/docker-node#image-variants) documents the libc distinction.

Flutter was upgraded with `flutter upgrade` and validated at 3.47.8. Direct application dependencies use current available releases. Some transitive packages are pinned by Flutter/Firebase/plugin constraints; forcing overrides would break their declared compatibility. Current Firebase Messaging 17 uses installation registration APIs and `message.fid`, implemented on both client and server. The build reports an upstream Firebase Kotlin migration warning, but the native builds pass.

## Boundaries that remain external

No user's Firebase service account, APNs key, signing certificate or store account is embedded. Builds without these remain useful for self-hosted viewing and incident actions; native delivery and distribution need configured provider/device acceptance. Public geographic diversity, Windows/Linux desktop installation behavior and production load are separate evidence categories. [Acceptance](acceptance.md) records them explicitly.

Maps, public nodes, SaaS billing, arbitrary shell execution, APM, browser scripts, automatic remediation and desktop/mobile always-on probe modes remain P2/out of scope as in the PRD. Independent performance degradation scores are also deferred; the initial release shows measured latency, assertions and coverage directly.
