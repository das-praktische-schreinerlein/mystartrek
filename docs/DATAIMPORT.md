# Data-Management

## initialize environment (once)

### initialze with celestrial-data

#### Import star-data into mystar-database per scripts
- convert geojson files via windows cmd
```cmd
sbin\celestrial-geojson-convert.bat
```
- create viewer-files for directory-entries via bash
```bash
sbin/celestrial-geojson-generate-viewer.sh
```

#### do it manually
- convert geojson files via windows cmd
```cmd
STARDIR=F:\playground\celestrial-star-geojson
for %f in (%STARDIR%\*.geojson) do (
    echo %~nf
    node dist\backend\serverAdmin.js ^
        --debug ^
        --command convertStarDoc ^
        --action convertGeoJsonToStarDoc ^
        --adminclibackend config/adminCli.dev.json ^
        --backend config/backend.dev.json ^
        --srcFile %STARDIR%\%~nf.geojson ^
        --mode RESPONSE ^
        --file %STARDIR%\%~nf.json ^
        --renameFileIfExists true
)
```
- create viewer-files for directory-entries via bash
```bash
STARDIR=F:/playground/celestrial-star-geojson
FILTER=$STARDIR/*.sdoc.json
FILES=`echo $FILTER | sed "s/ /,/g"`
echo $FILES
sbin/generateViewerFileForStaticData.sh $STARDIR/ $FILES mymm-stars
```

### import into solr

#### create solr-core
- create solr-core

#### import files
- import files via windows cmd per script
```cmd
sbin\celestrial-geojson-import.bat
```
- OR import files via windows cmd manualy
```cmd
STARDIR=F:\playground\celestrial-star-geojson
for %f in (%STARDIR%\*.sdoc.json) do (
    echo %~nf
    node dist\backend\serverAdmin.js ^
        --debug ^
        --command loadStarDoc ^
        --action loadStarDocs ^
        --adminclibackend config/adminCli.dev.json ^
        --backend config/backend.dev.json ^
        --file %STARDIR%\%~nf.json ^
        --renameFileAfterSuccess true
)
```

#### do it via default-configured data
- convert geojson to StartDoc-json and import
```
f:
cd \projekte\mystartrek
npm run backend-load-data
```
- OR do it manually
```
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --srcFile node_modules\d3-celestial\data\lg.json --mode SOLR --type LG --file F:\playground\celestrial-star-geojson\import-lg.sdoc.json
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --srcFile node_modules\d3-celestial\data\dsos.20.json --mode SOLR --type DSO --file F:\playground\celestrial-star-geojson\import-dsos.20.sdoc.json
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --srcFile node_modules\d3-celestial\data\stars.14.json --mode SOLR --type STAR --file F:\playground\celestrial-star-geojson\import-stars.14.sdoc.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc --action loadStarDocs --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --file  f:\playground\celestrial-star-geojson\import-lg.sdoc.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc --action loadStarDocs --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --file  f:\playground\celestrial-star-geojson\import-dsos.20.sdoc.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc --action loadStarDocs --adminclibackend config/adminCli.dev.json --backend config/backend.dev.json --file  f:\playground\celestrial-star-geojson\import-stars.14.sdoc.json
```

### configure local environments

### develop markerClusterGroup
- configure a ```backend.json``` with another port and SqlMediadb
- configure ```src/frontend/environments/environment.ts``` to use this as backend-url 

### beta
- configure a second ```backend.beta.json``` with another port and Solr with ```http://localhost:8983/solr/mystarmdev``` as backend
- configure ```src/frontend/environments/environment.beta.ts``` to use this as backend-url 


