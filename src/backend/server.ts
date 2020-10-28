// These are important and needed before anything else
import * as express from 'express';
import * as fs from 'fs';
import minimist from 'minimist';
import {ServerConfig, ServerModuleLoader} from './server-module.loader';

const argv = minimist(process.argv.slice(2));

const debug = argv['debug'] || false;
const filePathConfigJson = argv['c'] || argv['backend'] || 'config/backend.json';
const filePathFirewallConfigJson = argv['f'] || argv['firewall'] || 'config/firewall.json';
const serverConfig: ServerConfig = {
    apiDataPrefix: '/api/v1',
    apiAssetsPrefix: '/api/assets',
    apiPublicPrefix: '/api/static',
    filePathErrorDocs: './error_docs/',
    backendConfig: JSON.parse(fs.readFileSync(filePathConfigJson, { encoding: 'utf8' })),
    firewallConfig: JSON.parse(fs.readFileSync(filePathFirewallConfigJson, { encoding: 'utf8' }))
};

// create server
const app = express();

// load modules
ServerModuleLoader.loadModules(app, serverConfig);

// start server
app.listen(serverConfig.backendConfig['port'], function () {
    console.log('MySHP app listening on port ' + serverConfig.backendConfig.port);
    if (!debug) {
        console.log = function() {};
    }
    if (!debug || debug === true || parseInt(debug, 10) < 1) {
        console.trace = function() {};
        console.debug = function() {};
    }
});

