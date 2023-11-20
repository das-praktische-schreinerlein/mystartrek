import * as fs from 'fs';
import {StarDocDataServiceModule} from '../modules/sdoc-dataservice.module';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {CommonDocRecord} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';
import {
    GenericAdapterResponseMapper
} from '@dps/mycms-commons/dist/search-commons/services/generic-adapter-response.mapper';
import {CommonDocTransportModule} from '@dps/mycms-server-commons/dist/backend-commons/modules/cdoc-transport.module';
import {utils} from 'js-data';
import {CommonAdminCommand} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin.command';
import {
    SimpleConfigFilePathValidationRule,
    SimpleFilePathValidationRule,
    ValidationRule,
    WhiteListValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {DateUtils} from '@dps/mycms-commons/dist/commons/utils/date.utils';
import {FileUtils} from '@dps/mycms-commons/dist/commons/utils/file.utils';
import {StarDocFileUtils} from '../shared/sdoc-commons/services/sdoc-file.utils';

export class StarDocExporterCommand extends CommonAdminCommand {
    protected createValidationRules(): {[key: string]: ValidationRule} {
        return {
            backend: new SimpleConfigFilePathValidationRule(true),
            file: new SimpleFilePathValidationRule(true),
            renameFileIfExists: new WhiteListValidationRule(false, [true, false, 'true', 'false'], false)
        };
    }

    protected definePossibleActions(): string[] {
        return ['exportStarDocs'];
    }

    protected processCommandArgs(argv: {}): Promise<any> {
        const perRun = 999;
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

        const dataService: CommonDocDataService<CommonDocRecord, CommonDocSearchForm,
            CommonDocSearchResult<CommonDocRecord, CommonDocSearchForm>> =
            StarDocDataServiceModule.getDataService('sdocSolr', serverConfig.backendConfig);
        dataService.setWritable(false);
        const responseMapper: GenericAdapterResponseMapper = new StarDocAdapterResponseMapper(serverConfig.backendConfig);
        const writerCallback = function (output) {
            fs.appendFileSync(dataFileName, output);
        };
        const transporter: CommonDocTransportModule = new CommonDocTransportModule();

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

        return fileCheckPromise.then(() => {
            fs.writeFileSync(dataFileName, '{"sdocs": [');
            return transporter.exportDocs(typeOrder, perRun, writerCallback, responseMapper, dataService).then(value => {
                writerCallback(']}');
                return utils.resolve(value);
            });
        }).catch(reason => {
            return Promise.reject('exportfile already exists and cant be renamed: ' + reason);
        })
    }
}
