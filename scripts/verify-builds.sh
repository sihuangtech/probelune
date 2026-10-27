#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
# 独立构建，防止本地 go.work 掩盖缺失的远程依赖。
(cd probelune-contracts && GOWORK=off go vet ./... && GOWORK=off go test ./...)
(cd probelune-node && GOWORK=off go vet ./... && GOWORK=off go build ./...)
(cd probelune-dashboard/server && GOWORK=off go vet ./... && GOWORK=off go build ./...)
(cd probelune-dashboard/web && npm ci && npm run lint && npm run build)
(cd probelune-desktop && npm ci && npm run build)
(cd probelune-mobile && flutter pub get && flutter analyze && flutter build apk --debug)
# iOS 构建仅能在装有 Xcode 的 macOS 上执行；无签名构建不等于真机验收。
if [ "$(uname -s)" = Darwin ]; then
  (cd probelune-mobile && flutter build ios --no-codesign)
fi
