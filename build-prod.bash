#!/usr/bin/env bash

WORKSPACE="/cygdrive/f/Projekte/"
MYCMSPROJECT="mystartrek"

echo "STEP: build server -> they need the node_modules"
cd ${WORKSPACE}${MYCMSPROJECT}
npm run backend-build || exit

echo "STEP: build frontend  -> there MUST NOT be the node_modules"
cd ${WORKSPACE}${MYCMSPROJECT}
npm run build-prod || exit
npm run frontendserver-build-prod-de || exit
npm run frontendserver-build-server-prod-de || exit
npm run frontendserver-build-angularserver-prod-de || exit
npm run frontendserver-build-admin-prod-de || exit
