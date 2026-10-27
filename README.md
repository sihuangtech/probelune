# Probelune · 巡汐

[简体中文](README.zh-CN.md) · [Product requirements](PRD.md) · [Acceptance record](docs/acceptance.md)

**Self-hosted service monitoring from your own locations.** Deploy probe nodes on your servers or private networks, see availability and coverage together, then investigate with web, desktop and mobile clients.

![Probelune dashboard with two local validation nodes](docs/images/dashboard.png)

## Independent repositories

| Repository | Responsibility | Initial release |
| --- | --- | --- |
| [probelune-dashboard](https://github.com/sihuangtech/probelune-dashboard) | Vue web console + Go backend; one deployment | 0.1.0 |
| [probelune-node](https://github.com/sihuangtech/probelune-node) | Go probe service; Linux binary/container | 0.1.0 |
| [probelune-desktop](https://github.com/sihuangtech/probelune-desktop) | Electron local tools and remote comparisons; original history retained | 1.6.0 |
| [probelune-mobile](https://github.com/sihuangtech/probelune-mobile) | Flutter Android/iOS companion | 0.1.0 |
| [probelune-contracts](https://github.com/sihuangtech/probelune-contracts) | Versioned Go models, validation and HTTP/node protocol | 0.1.1 |

**This repository contains product documentation and local helper scripts.** It does not vendor the five projects or treat them as Git submodules. Each can be cloned, built and published independently. The dashboard's frontend and backend intentionally stay in the same repository.

## Start using Probelune

1. Follow the [dashboard quick start](https://github.com/sihuangtech/probelune-dashboard#quick-start-docker-compose).
2. Create and deploy [nodes](https://github.com/sihuangtech/probelune-node) on the networks you want to observe.
3. Add HTTP/HTTPS, TCP, ICMP or DNS monitors; choose nodes and notification channels.
4. Connect the desktop/mobile apps to that same dashboard. Complex configuration stays in the web console.

Node disconnection is a coverage problem, not proof a target is down. Repeated results are idempotent; old samples remain history. Incidents require configured consecutive failures/recoveries. HTTPS verification is enabled by default; private checks require an explicit node CIDR policy. Native push is optional and uses your Firebase/APNs project.

## Develop across projects

```sh
git clone https://github.com/sihuangtech/probelune.git
cd probelune
./scripts/clone-projects.sh
```

Read each project's README before installing its toolchain. The helper skips existing directories and never overwrites local work. An optional local `go.work` is ignored; release builds must use published contract versions with `GOWORK=off`.

[Architecture](docs/ARCHITECTURE.md) · [Implementation decisions](docs/DECISIONS.md) · [Acceptance](docs/acceptance.md) · [Release checklist](docs/RELEASE.md) · [Verified initial release](docs/RELEASE-2026-10-28.md)

Initial validation includes real local/contained checks, browser/Electron UI, Android emulator connection, native builds and backup restoration. It does not establish real geographic coverage, production-scale SLOs, signed distribution or FCM/APNs device delivery. Screenshots show clearly labelled local fixtures.

GPL-3.0-or-later. See [LICENSE](LICENSE), [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) and [CHANGELOG.md](CHANGELOG.md).
