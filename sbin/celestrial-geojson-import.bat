SET SCRIPTPATH=%~dp0
SET CWD=%cd%

call %SCRIPTPATH%configure-environment.cmd

cd %SCRIPTPATH%
cd %MYCMS%
echo *****************************************************************
echo import star geojson
echo *****************************************************************

for %f in (%STARDIR%\*.sdoc.json) do (
    echo %%~nf
    node dist\backend\serverAdmin.js ^
        --debug ^
        --command loadStarDoc ^
        --action loadDocs ^
        --adminclibackend config/adminCli.dev.json ^
        --backend config/backend.dev.json ^
        --file %STARDIR%/%%~nf.sdoc.json ^
        --renameFileAfterSuccess true
)

cd %CWD%

