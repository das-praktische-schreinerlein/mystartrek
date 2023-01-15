#!/bin/bash
# exit on error
set -e
CWD=$(pwd)
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

echo "now: configure linux vars: run sbin/configure-environment.sh"
source ${SCRIPTPATH}/configure-environment.bash

echo "run generate celestrial-viewer for dir: ${STARDIR}"
FILTER=$STARDIR/*.sdoc.json
FILES=`echo $FILTER | sed "s/ /,/g"`

echo "run generate celestrial-viewer for files: ${FILES}"
${SCRIPTPATH}/generateViewerFileForStaticData.sh ${STARDIR}/ $FILES mystarm-stars
${SCRIPTPATH}/setConfigValueInViewerFile.sh "${W_STARDIR}\\mystarm-stars.html" "bestMatchingTabsOrder" '"POI","INFO"'
${SCRIPTPATH}/setConfigValueInViewerFile.sh "${W_STARDIR}\\mystarm-stars.html" "favoritesTabsOrder" '"POI"'

echo "done generate celestrial-viewer for files: ${FILES}"
