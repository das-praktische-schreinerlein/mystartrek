import {CommonEnvironment} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/common-environment';
import {DataMode} from '../shared/commons/model/datamode.enum';

export interface AppEnvironment extends CommonEnvironment {
    hideCopyrightFooter?: boolean,
    hideInternalDescLinks?: boolean;
    hideInternalImages?: boolean,
    assetsPathVersionSnippet: string;
    assetsPathVersionSuffix: string;
    sdocMaxItemsPerAlbum: number;
    currentDataMode?: DataMode;
    startDataMode?: DataMode;
    availableDataModes?: DataMode[];
    staticPDocsFile?: string;
    staticSDocsFiles?: string[];
}
