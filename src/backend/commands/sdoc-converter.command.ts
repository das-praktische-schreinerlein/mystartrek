import * as fs from 'fs';
import {StarDocDataServiceModule} from '../modules/sdoc-dataservice.module';
import {
    KeywordValidationRule,
    SimpleConfigFilePathValidationRule,
    SimpleFilePathValidationRule,
    ValidationRule,
    WhiteListValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {CommonAdminCommand} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin.command';
import {StarDocFileUtils} from '../shared/sdoc-commons/services/sdoc-file.utils';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import {StarDocConverterModule} from '../modules/sdoc-converter.module';
import {StarDocSolrAdapter} from '../shared/sdoc-commons/services/sdoc-solr.adapter';
import {DateUtils} from '@dps/mycms-commons/dist/commons/utils/date.utils';
import {FileUtils} from '@dps/mycms-commons/dist/commons/utils/file.utils';

export class StarDocConverterCommand extends CommonAdminCommand {
    protected createValidationRules(): {[key: string]: ValidationRule} {
        return {
            backend: new SimpleConfigFilePathValidationRule(true),
            srcFile: new SimpleFilePathValidationRule(true),
            file: new SimpleFilePathValidationRule(true),
            renameFileIfExists: new WhiteListValidationRule(false, [true, false, 'true', 'false'], false),
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
        if (writable) {
            dataService.setWritable(true);
        }

        const sdocConverterModule = new StarDocConverterModule(backendConfig, dataService);

        let promise: Promise<any>;
        switch (action) {
            case 'convertGeoJsonToStarDoc':
                const dataFileName = StarDocFileUtils.normalizeCygwinPath(argv['file']);
                if (dataFileName === undefined) {
                    return Promise.reject('option --file expected');
                }

                const srcFile = StarDocFileUtils.normalizeCygwinPath(argv['srcFile']);
                if (srcFile === undefined) {
                    console.error(srcFile + ' missing parameter - usage: --srcFile SRCFILE', argv);
                    return Promise.reject(srcFile + ' missing parameter - usage: --srcFile SRCFILE');
                }

                const type = argv['type'];
                if (type === undefined) {
                    console.error(type + ' missing parameter - usage: --type TYPE', argv);
                    return Promise.reject(type + ' missing parameter - usage: --type TYPE');
                }

                const mode = argv['mode'];
                if (mode === undefined || (mode !== 'SOLR' && mode !== 'RESPONSE')) {
                    console.error(mode + ' missing parameter - usage: --mode SOLR|RESPONSE', argv);
                    return Promise.reject(mode + ' missing parameter - usage: --mode SOLR|RESPONSE');
                }

                const renameFileIfExists = !!argv['renameFileIfExists'];
                let fileCheckPromise: Promise<any>;
                if (fs.existsSync(dataFileName)) {
                    if (!renameFileIfExists) {
                        return Promise.reject('exportfile already exists');
                    }

                    const newFile = dataFileName + '.' + DateUtils.formatToFileNameDate(new Date(), '', '-', '') + '-export.MOVED';
                    fileCheckPromise = FileUtils.moveFile(dataFileName, newFile, false);
                } else {
                    fileCheckPromise = Promise.resolve();
                }

                promise = fileCheckPromise.then(() => {
                    return sdocConverterModule.convertGeoJSONOStarDoc(srcFile, type).then(value => {
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

                        fs.writeFileSync(dataFileName, JSON.stringify({ sdocs: sdocs}, undefined, ' '));
                    }).catch(reason => {
                        console.error('something went wrong:', reason);
                        return Promise.reject(reason);
                    });
                }).catch(reason => {
                    return Promise.reject('exportfile already exists and cant be renamed: ' + reason);
                })

                break;
            default:
                console.error('unknown action:', argv);
                return Promise.reject('unknown action');
        }

        return promise;
    }
}
