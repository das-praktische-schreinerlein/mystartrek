import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {
    CommonDocActionTagService,
    CommonDocActionTagServiceConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-actiontag.service';
import {GeoDocDataService} from '../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocAlbumService} from './gdoc-album.service';
import {GeoDocPlaylistService} from './gdoc-playlist.service';

@Injectable()
export class GeoDocActionTagService extends CommonDocActionTagService<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult,
    GeoDocDataService> {
    constructor(router: Router, cdocDataService: GeoDocDataService,
                cdocPlaylistService: GeoDocPlaylistService,
                cdocAlbumService: GeoDocAlbumService,
                appService: GenericAppService) {
        super(router, cdocDataService, cdocPlaylistService, cdocAlbumService, appService);
        this.configureComponent({});
    }

    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig {
        return {
            baseEditPath: 'gdocadmin'
        };
    }
}
