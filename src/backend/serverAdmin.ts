import minimist from 'minimist';
import {SiteMapGeneratorCommand} from './commands/sitemap-generator.command';
import {utils} from 'js-data';

const argv = minimist(process.argv.slice(2));

// disable debug-logging
const debug = argv['debug'] || false;
if (!debug) {
    console.trace = function() {};
    console.debug = function() {};
    console.log = function() {};
}

const siteMapGenerator = new SiteMapGeneratorCommand();

let promise: Promise<any>;
switch (argv['command']) {
    case 'generateSitemap':
        promise = siteMapGenerator.process(argv);
        break;
    default:
        console.error('unknown command:', argv);
        promise = utils.reject('unknown command');
}

promise.then(value => {
    process.exit(0);
}).catch(reason => {
    process.exit(-1);
});
