SET SCRIPTPATH=%~dp0
SET CWD=%cd%

call %SCRIPTPATH%configure-environment.cmd

cd %SCRIPTPATH%
cd %MYCMS%
echo *****************************************************************
echo convert celestrial geojson
echo *****************************************************************

node dist\backend\serverAdmin.js ^
    --debug ^
    --command convertStarDoc ^
    --action convertGeoJsonToStarDoc ^
    --adminclibackend config/adminCli.dev.json ^
    --backend config/backend.dev.json ^
    --srcFile node_modules\d3-celestial\data\lg.json ^
    --mode SOLR ^
    --type LG ^
    --file %STARDIR%\lg.sdoc.json
node dist\backend\serverAdmin.js ^
    --debug ^
    --command convertStarDoc ^
    --action convertGeoJsonToStarDoc ^
    --adminclibackend config/adminCli.dev.json ^
    --backend config/backend.dev.json ^
    --srcFile node_modules\d3-celestial\data\dsos.20.json ^
    --mode SOLR ^
    --type DSO ^
    --file %STARDIR%\dso.sdoc.json
node dist\backend\serverAdmin.js ^
    --debug ^
    --command convertStarDoc ^
    --action convertGeoJsonToStarDoc ^
    --adminclibackend config/adminCli.dev.json ^
    --backend config/backend.dev.json ^
    --srcFile node_modules\d3-celestial\data\stars.14.json ^
    --mode SOLR ^
    --type STAR ^
    --file %STARDIR%\stars.14.sdoc.json

for %%f in (%STARDIR%\*.geojson) do (
    echo "convert file: %%~nf"
    node dist\backend\serverAdmin.js ^
        --debug ^
        --command convertStarDoc ^
        --action convertGeoJsonToStarDoc ^
        --adminclibackend config/adminCli.dev.json ^
        --backend config/backend.dev.json ^
        --srcFile %STARDIR%\%%~nf.geojson ^
        --mode RESPONSE ^
        --file %STARDIR%\%%~nf.sdoc.json ^
        --renameFileIfExists true
)

cd %CWD%

