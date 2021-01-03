import {SiteMapGeneratorCommand} from './sitemap-generator.command';
import {utils} from 'js-data';

export class AdminCommandManager {
    protected siteMapGenerator: SiteMapGeneratorCommand;

    constructor() {
        this.siteMapGenerator = new SiteMapGeneratorCommand();
    }

    public process(argv): Promise<any> {
        let promise: Promise<any>;
        switch (argv['command']) {
            case 'generateSitemap':
                promise = this.siteMapGenerator.process(argv);
                break;
            default:
                console.error('unknown command:', argv);
                promise = utils.reject('unknown command');
        }

        return promise;
    }
}

