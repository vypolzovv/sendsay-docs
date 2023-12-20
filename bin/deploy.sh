#!/usr/bin/env bash

export BUILD_PATH=build-docs
export BRANCH=stable
export RELEASE_NAME=$(git log -1 --pretty=format:"%s %h %an")
export MESSAGE=$RELEASE_NAME
export BUILD_REPO=sendsay-docs-build

git clone git@github.com:sendsay-ru/$BUILD_REPO.git /tmp/$BUILD_REPO

yarn run build

rm -rf /tmp/$BUILD_REPO/$BUILD_PATH

yes | cp -R build /tmp/$BUILD_REPO/$BUILD_PATH

cd /tmp/$BUILD_REPO

echo $MESSAGE > $BUILD_PATH/COMMIT

git add .
git commit -m "$MESSAGE"
git push origin $BRANCH
