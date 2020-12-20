import minimist from 'minimist';
import {SiteMapGeneratorCommand} from './commands/sitemap-generator.command';
import {utils} from 'js-data';
import {StarDocLoaderCommand} from "./commands/sdoc-loader.command";
import {StarDocExporterCommand} from "./commands/sdoc-exporter.command";
import {StarDocConverterCommand} from "./commands/sdoc-converter.command";

const argv = minimist(process.argv.slice(2));

// disable debug-logging
const debug = argv['debug'] || false;
if (!debug) {
    console.log = function() {};
}
if (!debug || debug === false || parseInt(debug, 10) < 1) {
    console.trace = function() {};
    console.debug = function() {};
}

const sdocConverter = new StarDocConverterCommand();
const sdocLoader = new StarDocLoaderCommand();
const sdocExporter = new StarDocExporterCommand();
const siteMapGenerator = new SiteMapGeneratorCommand();

let promise: Promise<any>;
switch (argv['command']) {
    case 'generateSitemap':
        promise = siteMapGenerator.process(argv);
        break;
    case 'convertStarDoc':
        promise = sdocConverter.process(argv);
        break;
    case 'loadStarDoc':
        promise = sdocLoader.process(argv);
        break;
    case 'exportStarDoc':
        promise = sdocExporter.process(argv);
        break;
    default:
        console.error('unknown command:', argv);
        promise = utils.reject('unknown command');
}

promise.then(value => {
    console.log('DONE - command finished:', value, argv);
    process.exit(0);
}).catch(reason => {
    console.error('ERROR - command failed:', reason, argv);
    process.exit(-1);
});
