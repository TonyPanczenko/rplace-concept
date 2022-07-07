#!/usr/bin/env sh

set -e
set -o allexport
source .env.local
set +o allexport

npm run build

cd build

git init
git checkout -b main
git add -A
git commit -m 'deploy'

echo "git@github.com:${GH_ACCOUNT}/${GH_REPO}.git"
git push -f git@github.com:${GH_ACCOUNT}/${GH_REPO}.git main:gh-pages

cd -