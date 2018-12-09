import * as fs from 'fs';
import {utils} from 'js-data';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import {AbstractCommand} from '@dps/mycms-server-commons/dist/backend-commons/commands/abstract.command';
import {StarDocDataServiceModule} from "../modules/sdoc-dataservice.module";
import {StarDocConverterModule} from "../modules/sdoc-converter.module";
import {StarDocSolrAdapter} from "../shared/sdoc-commons/services/sdoc-solr.adapter";

export class StarDocConverterCommand implements AbstractCommand {
    public process(argv): Promise<any> {
        const filePathConfigJson = argv['c'] || argv['backend'] || 'config/backend.json';
        const backendConfig = JSON.parse(fs.readFileSync(filePathConfigJson, {encoding: 'utf8'}));
        const writable = backendConfig['sdocWritable'] === true || backendConfig['sdocWritable'] === 'true';
        const dataService = StarDocDataServiceModule.getDataService('sdocSolrReadOnly', backendConfig);
        const action = argv['action'];
        const srcFile = argv['srcFile'];
        const type = argv['type'];
        const mode = argv['mode'];
        if (writable) {
            dataService.setWritable(true);
        }

        const sdocConverterModule = new StarDocConverterModule(backendConfig, dataService);
        
        let promise: Promise<any>;
        switch (action) {
            case 'convertGeoJsonToStarDoc':
                if (srcFile === undefined) {
                    console.error(srcFile + ' missing parameter - usage: --srcFile SRCFILE', argv);
                    promise = utils.reject(srcFile + ' missing parameter - usage: --srcFile SRCFILE');
                    return promise;
                }
                if (type === undefined) {
                    console.error(type + ' missing parameter - usage: --type TYPE', argv);
                    promise = utils.reject(type + ' missing parameter - usage: --type TYPE');
                    return promise;
                }
                if (mode === undefined || (mode !== 'SOLR' && mode !== 'RESPONSE')) {
                    console.error(mode + ' missing parameter - usage: --mode SOLR|RESPONSE', argv);
                    promise = utils.reject(mode + ' missing parameter - usage: --mode SOLR|RESPONSE');
                    return promise;
                }

                promise = sdocConverterModule.convertGeoJSONOStarDoc(srcFile, type);
                promise.then(value => {
                    const responseMapper = new StarDocAdapterResponseMapper(backendConfig);
                    const solrAdapter = new StarDocSolrAdapter({});
                    const sdocs = [];
                    for (const sdoc of value) {
                        if (mode === 'SOLR') {
                            sdocs.push(solrAdapter.mapToAdapterDocument(sdoc));
                        } else {
                            sdocs.push(responseMapper.mapToAdapterDocument({}, sdoc));
                        }
                    }

                    console.log(JSON.stringify({ sdocs: sdocs}, undefined, ' '));
                }).catch(reason => {
                    console.error('something went wrong:', reason);
                });

                break;
            default:
                console.error('unknown action:', argv);
                promise = utils.reject('unknown action');
        }

        return promise;
    }
}
