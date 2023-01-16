SET SCRIPTPATH=%~dp0
SET CWD=%cd%

call %SCRIPTPATH%configure-environment.cmd

cd %SCRIPTPATH%
cd %MYCMS%
echo *****************************************************************
echo import star geojson
echo *****************************************************************

for %%f in (%STARDIR%\*.sdoc.json) do (
    echo %%~nf
    node dist\backend\serverAdmin.js ^
        --debug ^
        --command loadStarDoc ^
        --action loadStarDocs ^
        --adminclibackend config/adminCli.dev.json ^
        --backend config/backend.dev.json ^
        --file %STARDIR%/%%~nf.json ^
        --renameFileAfterSuccess true
)

cd %CWD%

