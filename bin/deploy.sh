#!/usr/bin/env bash

export BUILD_PATH=build-docs
export RELEASE_NAME=$(git describe --all);
export MESSAGE=sendsay-docs\ $BUILD_PATH\ $RELEASE_NAME

git clone git@github.com:sendsay-ru/sendsay-frontend-builds.git /tmp/sendsay-frontend-builds

yarn run build

rm -rf /tmp/sendsay-frontend-builds/$BUILD_PATH

yes | cp -R build /tmp/sendsay-frontend-builds/$BUILD_PATH

cd /tmp/sendsay-frontend-builds

echo $MESSAGE > $BUILD_PATH/COMMIT

git add .
git commit -m "$MESSAGE"
git push origin master
