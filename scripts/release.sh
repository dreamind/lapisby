#!/bin/bash
# Based on https://github.com/pouchdb/pouchdb/blob/master/bin/release.sh
set -e

if [ ! -z $DRY_RUN ]; then
  echo "Doing a dry run release..."
elif [ ! -z $BETA ]; then
  echo "Doing a beta release to npm..."
else
  echo "Doing a real release! Use DRY_RUN=1 for a dry run instead."
fi

#make sure deps are up to date
pnpm install -r

# get current version
VERSION=$(node --eval "console.log(require('./packages/core/package.json').version);")

# Create a temporary build directory
CURRENT_BRANCH=$(git name-rev --name-only HEAD)
BUILD_BRANCH=build_"${RANDOM}"
git checkout -b $BUILD_BRANCH

# Publish all modules with npm
for pkg in $(ls packages); do
  if [ ! -d "packages/$pkg" ]; then
    continue
  elif [ "true" = $(node --eval "console.log(require('./packages/$pkg/package.json').private);") ]; then
    continue
  fi
  cd packages/$pkg
  echo "Publishing $pkg..."
  if [ ! -z $DRY_RUN ]; then
    echo "Dry run, not publishing"
  elif [ ! -z $BETA ]; then
    npm publish --tag beta
  else
    npm publish
  fi
  cd -
done

git commit -m "build $VERSION"

# Only "publish" to GitHub if this is a non-beta non-dry run
if [ -z $DRY_RUN ]; then
 if [ -z $BETA ]; then
    # Tag and push
    git tag $VERSION
    git push --tags git@github.com:dreamind/lapisby.git $VERSION

    # Cleanup
    git checkout $CURRENT_BRANCH
    git branch -D $BUILD_BRANCH
  fi
fi