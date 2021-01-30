import * as fs from 'fs';
import {StarDocDataServiceModule} from '../modules/sdoc-dataservice.module';
import {
    KeywordValidationRule,
    ValidationRule,
    WhiteListValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {
    CommonAdminCommand,
    SimpleConfigFilePathValidationRule,
    SimpleFilePathValidationRule
} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin.command';
import {StarDocFileUtils} from '../shared/sdoc-commons/services/sdoc-file.utils';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import {StarDocConverterModule} from '../modules/sdoc-converter.module';
import {StarDocSolrAdapter} from '../shared/sdoc-commons/services/sdoc-solr.adapter';

export class StarDocConverterCommand extends CommonAdminCommand {
    protected createValidationRules(): {[key: string]: ValidationRule} {
        return {
            backend: new SimpleConfigFilePathValidationRule(true),
            srcFile: new SimpleFilePathValidationRule(true),
            mode: new WhiteListValidationRule(true, ['SOLR', 'RESPONSE'], false),
            type: new KeywordValidationRule(true)
        };
    }

    protected definePossibleActions(): string[] {
        return ['convertGeoJsonToStarDoc'];
    }

    protected processCommandArgs(argv: {}): Promise<any> {
        const filePathConfigJson = argv['backend'];
        if (filePathConfigJson === undefined) {
            return Promise.reject('ERROR - parameters required backendConfig: "--backend"');
        }

        const backendConfig = JSON.parse(fs.readFileSync(filePathConfigJson, {encoding: 'utf8'}));
        const writable = backendConfig['sdocWritable'] === true || backendConfig['sdocWritable'] === 'true';
        const dataService = StarDocDataServiceModule.getDataService('sdocSolrReadOnly', backendConfig);
        const action = argv['action'];
        const srcFile = StarDocFileUtils.normalizeCygwinPath(argv['srcFile']);
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
                    return Promise.reject(srcFile + ' missing parameter - usage: --srcFile SRCFILE');
                }
                if (type === undefined) {
                    console.error(type + ' missing parameter - usage: --type TYPE', argv);
                    return Promise.reject(type + ' missing parameter - usage: --type TYPE');
                }
                if (mode === undefined || (mode !== 'SOLR' && mode !== 'RESPONSE')) {
                    console.error(mode + ' missing parameter - usage: --mode SOLR|RESPONSE', argv);
                    return Promise.reject(mode + ' missing parameter - usage: --mode SOLR|RESPONSE');
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
                    return Promise.reject(reason);
                });

                break;
            default:
                return Promise.reject('unknown action');
        }

        return promise;
    }
}
