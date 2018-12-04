import minimist from 'minimist';
import {SiteMapGeneratorCommand} from './commands/sitemap-generator.command';
import {utils} from 'js-data';
import {GeoDocLoaderCommand} from "./commands/gdoc-loader.command";
import {GeoDocExporterCommand} from "./commands/gdoc-exporter.command";
import {GeoDocConverterCommand} from "./commands/gdoc-converter.command";

const argv = minimist(process.argv.slice(2));

// disable debug-logging
const debug = argv['debug'] || false;
if (!debug) {
    console.trace = function() {};
    console.debug = function() {};
    console.log = function() {};
}

const gdocConverter = new GeoDocConverterCommand();
const gdocLoader = new GeoDocLoaderCommand();
const gdocExporter = new GeoDocExporterCommand();
const siteMapGenerator = new SiteMapGeneratorCommand();

let promise: Promise<any>;
switch (argv['command']) {
    case 'generateSitemap':
        promise = siteMapGenerator.process(argv);
        break;
    case 'convertGeoDoc':
        promise = gdocConverter.process(argv);
        break;
    case 'loadGeoDoc':
        promise = gdocLoader.process(argv);
        break;
    case 'exportGeoDoc':
        promise = gdocExporter.process(argv);
        break;
    default:
        console.error('unknown command:', argv);
        promise = utils.reject('unknown command');
}

promise.then(value => {
    process.exit(0);
}).catch(reason => {
    console.error('error:', reason);
    process.exit(-1);
});
