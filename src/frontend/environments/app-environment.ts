import {CommonEnvironment} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/common-environment';

export interface AppEnvironment extends CommonEnvironment {
    assetsPathVersionSnippet: string;
    assetsPathVersionSuffix: string;
    gdocMaxItemsPerAlbum: number;
}
