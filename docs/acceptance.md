# Acceptance record / 验收记录

Date: 2026-10-28. Local environment: macOS arm64, Node 26, Go 1.27, Flutter 3.47.8 / Dart 3.13.7, Xcode 27.1, Android SDK 37 and Docker Engine 29.9.2. Private credentials, local runtime databases and temporary smoke scripts are excluded from all repositories.

## Build evidence

| Component | Validation | Boundary |
| --- | --- | --- |
| Contracts | `gofmt`, `go vet`, focused validation tests; published v0.1.0/v0.1.1 and successful GitHub CI | Protocol unit checks are not device/provider proof |
| Dashboard | Vue lint/typecheck/production build, Go vet/build, native container build | Large chunks remain a bundle optimization opportunity |
| Node | Go vet/build with `GOWORK=off`, container build, Linux targets in CI | Host/network permissions remain deployment-dependent |
| Desktop | Vite build, actual Electron UI, unsigned macOS arm64 `.app` packaged and launched; preload reports 1.6.0 | No notarization, Windows/Linux signed installer or auto-update claim |
| Mobile | `flutter analyze`, Android debug APK, installed Android emulator, unsigned iOS device compilation | Not a signed iPhone installation or store submission |

The standalone Go builds fetched contracts from the public versioned repository after temporary local replacements were removed. Tests reporting `[no test files]` on application packages are compilation checks, not invented unit-test coverage. Most validation used running services and clients.

## Runtime evidence

| PRD scenario | Observed result |
| --- | --- |
| AC-01 initial deployment | Clean non-root Docker dashboard initialized an administrator, registered a container node with a one-time token, and received a real HTTP health check |
| AC-02 multiple observations | Two local node processes independently checked a controlled HTTP fixture; web, Electron and Android consumed real API data. They are not different geographic networks |
| AC-03 partial failure | Controlled protocol fixture with one failed and one healthy node produced `partial`; this verifies aggregation, not a regional outage |
| AC-04 node outage | Stopping one real node produced unknown coverage and a separate node event; the target was not marked globally down |
| AC-05 DNS isolation | Twelve concurrent checks against two controlled resolvers returned their own distinct A records without cross-contamination; system-default resolver also returned a real public-domain answer |
| AC-06 TLS | An untrusted local HTTPS certificate returned a TLS failure with its cause; no plaintext fallback. Explicit bypass stayed visible; insufficient remaining lifetime failed `certificate_expiry` |
| AC-07 thresholds/deduplication | Controlled HTTP 503 fixture confirmed down after 3 failures and recovery after 2 successes. Repeated uploads left one sample per result ID |
| AC-08 maintenance | Suppressed incident/evidence remained visible; acknowledgement did not recover it; ending maintenance invalidated previous confirmation and required fresh samples |
| AC-09 diagnostics | Electron compared actual local and two remote HTTP results; cancelled jobs stayed cancelled after a late success upload. Node container ICMP and MTR succeeded with only NET_RAW capability |
| AC-10 node lifecycle | Reusing a registration token failed; a revoked node identity immediately received 401 |
| AC-11 authorization | Viewer could read overview but direct monitor, diagnostic, node, maintenance, member and channel-secret operations returned 403; revoked sessions and pairing-code replay failed |
| AC-12 input/policy | Shell metacharacter target rejected before execution; ungranted loopback HTTP target returned executor/policy error. Foreign Origin cookie writes were rejected |
| AC-13 historical uploads | A newly uploaded older failure was stored with `late=true` while fresh healthy state and timestamp remained unchanged |
| AC-14 history | Availability and coverage displayed separately; node downtime lowered coverage without becoming target failures; no invented zero-latency gap samples |
| AC-15 backup | Online snapshot plus key restored into a different clean data directory; existing login, monitor, 300 queried historical rows and node identity worked |
| AC-16 mobile workflow | Android emulator signed into the running instance, opened real history/evidence, started an immediate recheck and displayed successful responses from both nodes |
| AC-17 desktop | Actual source Electron and packaged macOS app loaded the dashboard; renderer/IPC bridge worked and local/remote sources were labelled |
| AC-18 webhook | Local receiver verified HMAC over timestamp/raw body; first HTTP 503 retried and the second attempt was marked sent |
| Continuing reminders | A separate failing HTTP fixture produced exactly one one-minute reminder, carrying the stable instance identity; recovery from the real nodes then produced a recovery notification |

Web navigation covered the primary routes, monitor editor, node configuration, settings/audit and notification views. No renderer page errors were observed. A 390-pixel viewport had no document-level horizontal overflow; the 1440-pixel layout was visually inspected. Mobile connected to the same running dashboard and displayed real history/evidence, not hard-coded demo data. After rebuilding/restarting the server, settings, login and overview returned the same stable instance identity; a settings update could not replace it. A final online backup completed successfully. Certificate-lifetime assertions on a plaintext HTTP response were rejected as configuration errors.

Official `npm audit fix` resolved the desktop's reported transitive dependency advisories; the final audit reported zero known vulnerabilities. The dashboard production dependency audit also reported zero. This reflects the registry advisory data at validation time, not a security guarantee.

## Explicit remaining release validation

- AC-02: independently deployed nodes on genuinely different networks/regions; local fixtures do not prove geographic behavior.
- AC-05: controlled resolver isolation and one default-resolver lookup do not establish a complete multi-resolver/network compatibility matrix.
- AC-12: policy and input smoke checks do not constitute a penetration test or exhaustive rebinding/IPv6 environment audit.
- AC-16: Firebase/APNs credentials, real-device background/terminated push, signing, store privacy declarations and publication. Provider setup is documented; actual delivery has not been claimed.
- SMTP inbox delivery and real email-provider authentication require configured accounts; local signed Webhook delivery is the exercised notification channel.
- Windows/Linux desktop installation, OS permission variations, IPv6-only deployments, long offline spool pressure and one-year retention soak tests require additional environments/time.
- The PRD's 100 monitors × 5 nodes and latency/SLO budgets remain benchmark targets. No production load or uptime guarantee is inferred from local builds.

These are concrete deployment/release gates, not missing secret placeholders hidden as successful checks. See each repository's release and operational instructions. GitHub CI results should be read at the pushed revision; they do not replace the device/provider gates above.
