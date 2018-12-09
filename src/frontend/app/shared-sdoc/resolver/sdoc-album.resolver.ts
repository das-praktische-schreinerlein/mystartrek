import {Injectable} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocSearchResult} from '../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocDataService} from '../../../shared/sdoc-commons/services/sdoc-data.service';
import {CommonDocAlbumResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-album.resolver';
import {StarDocAlbumService} from '../services/sdoc-album.service';

@Injectable()
export class StarDocAlbumResolver extends CommonDocAlbumResolver<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    constructor(appService: GenericAppService, albumService: StarDocAlbumService, dataService: StarDocDataService) {
        super(appService, albumService, dataService);
    }
}
