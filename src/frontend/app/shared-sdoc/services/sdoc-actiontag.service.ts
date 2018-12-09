import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {
    CommonDocActionTagService,
    CommonDocActionTagServiceConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-actiontag.service';
import {StarDocDataService} from '../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocAlbumService} from './sdoc-album.service';
import {StarDocPlaylistService} from './sdoc-playlist.service';

@Injectable()
export class StarDocActionTagService extends CommonDocActionTagService<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    constructor(router: Router, cdocDataService: StarDocDataService,
                cdocPlaylistService: StarDocPlaylistService,
                cdocAlbumService: StarDocAlbumService,
                appService: GenericAppService) {
        super(router, cdocDataService, cdocPlaylistService, cdocAlbumService, appService);
        this.configureComponent({});
    }

    protected getComponentConfig(config: {}): CommonDocActionTagServiceConfig {
        return {
            baseEditPath: 'sdocadmin'
        };
    }
}
