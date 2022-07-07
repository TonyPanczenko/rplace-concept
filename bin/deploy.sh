#!/usr/bin/env sh

set -e

npm run build

cd build

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:tonypanczenko/rplace-concept.git main:gh-pages

cd -