# Data-Management

## initialize environment (once)

### create solr-core
- create solr-core
```
```

### initialize with celestial-data
- convert geojson to StartDoc-json and import
```
f:
cd \projekte\mystartrek
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --srcFile node_modules\d3-celestial\data\lg.json --mode SOLR --type LG > d:\tmp\import-sdocs-lg.json
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --srcFile node_modules\d3-celestial\data\dsos.20.json --mode SOLR --type DSO > d:\tmp\import-sdocs-dsos.20.json
node dist\backend\serverAdmin.js --debug --command convertStarDoc --action convertGeoJsonToStarDoc --srcFile node_modules\d3-celestial\data\stars.14.json --mode SOLR --type STAR > d:\tmp\import-sdocs-stars.14.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc  -c config\backend.json -f d:\docs\import-sdocs-lg.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc  -c config\backend.json -f d:\docs\import-sdocs-dsos.20.json
node dist\backend\serverAdmin.js --debug --command loadStarDoc  -c config\backend.json -f d:\docs\import-sdocs-stars.14.json
```

### configure local environments

### develop markerClusterGroup
- configure a ```backend.json``` with another port and SqlMediadb
- configure ```src/frontend/environments/environment.ts``` to use this as backend-url 

### beta
- configure a second ```backend.beta.json``` with another port and Solr with ```http://localhost:8983/solr/mystarmdev``` as backend
- configure ```src/frontend/environments/environment.beta.ts``` to use this as backend-url 


