#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
for name in dashboard node desktop mobile contracts; do
  directory="probelune-$name"
  if [ -e "$directory" ]; then
    printf 'Keeping existing %s\n' "$directory"
  else
    git clone "https://github.com/sihuangtech/$directory.git" "$directory"
  fi
done
