import {CommonEnvironment} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/common-environment';
import {DataMode} from '../shared/commons/model/datamode.enum';

export interface AppEnvironment extends CommonEnvironment {
    assetsPathVersionSnippet: string;
    assetsPathVersionSuffix: string;
    currentDataMode?: DataMode;
    startDataMode?: DataMode;
    availableDataModes?: DataMode[];
    staticPDocsFile?: string;
}
