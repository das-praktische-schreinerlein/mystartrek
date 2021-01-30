import * as fs from 'fs';
import {StarDocDataServiceModule} from '../modules/sdoc-dataservice.module';
import {StarDocFileUtils} from '../shared/sdoc-commons/services/sdoc-file.utils';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {GenericAdapterResponseMapper} from '@dps/mycms-commons/dist/search-commons/services/generic-adapter-response.mapper';
import {CommonDocTransportModule} from '@dps/mycms-server-commons/dist/backend-commons/modules/cdoc-transport.module';
import {
    CommonAdminCommand,
    SimpleConfigFilePathValidationRule,
    SimpleFilePathValidationRule
} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin.command';
import {
    ValidationRule,
    WhiteListValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {DateUtils} from '@dps/mycms-commons/dist/commons/utils/date.utils';
import {FileUtils} from '@dps/mycms-commons/dist/commons/utils/file.utils';

export class StarDocLoaderCommand extends CommonAdminCommand {
    protected createValidationRules(): {[key: string]: ValidationRule} {
        return {
            backend: new SimpleConfigFilePathValidationRule(true),
            file: new SimpleFilePathValidationRule(true),
            renameFileAfterSuccess:  new WhiteListValidationRule(false, [true, false, 'true', 'false'], false)
        };
    }

    protected definePossibleActions(): string[] {
        return ['loadStarDocs'];
    }

    protected processCommandArgs(argv: {}): Promise<any> {
        const typeOrder = ['dso', 'star', 'lg'];

        const filePathConfigJson = argv['backend'];
        if (filePathConfigJson === undefined) {
            return Promise.reject('ERROR - parameters required backendConfig: "--backend"');
        }

        const serverConfig = {
            backendConfig: JSON.parse(fs.readFileSync(filePathConfigJson, { encoding: 'utf8' })),
            readOnly: false
        };

        const dataFileName = StarDocFileUtils.normalizeCygwinPath(argv['file']);
        if (dataFileName === undefined) {
            return Promise.reject('option --file expected');
        }

        const renameFileOption = !!argv['renameFileAfterSuccess'];
        const dataService: CommonDocDataService<CommonDocRecord, CommonDocSearchForm,
            CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>> =
            StarDocDataServiceModule.getDataService('sdocSolr', serverConfig.backendConfig);
        dataService.setWritable(true);
        const responseMapper: GenericAdapterResponseMapper = new StarDocAdapterResponseMapper(serverConfig.backendConfig);
        const transporter: CommonDocTransportModule = new CommonDocTransportModule();

        const recordSrcs = StarDocFileUtils.parseRecordSourceFromJson(fs.readFileSync(dataFileName, { encoding: 'utf8' }));
        return transporter.loadDocs(recordSrcs, typeOrder, responseMapper, dataService).then(() => {
            let promise: Promise<any>;
            if (renameFileOption) {
                const newFile = dataFileName + '.' + DateUtils.formatToFileNameDate(new Date(), '', '-', '') + '-import.DONE';
                promise = FileUtils.moveFile(dataFileName, newFile, false);
            } else {
                promise = Promise.resolve();
            }

            return promise.then(() => {
                return Promise.resolve('file imported');
            }).catch(reason => {
                return Promise.resolve('file imported but cant be renamed: ' + reason);
            })
        });
    }
}
