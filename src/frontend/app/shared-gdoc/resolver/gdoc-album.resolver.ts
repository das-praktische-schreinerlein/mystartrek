import {Injectable} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocSearchResult} from '../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocDataService} from '../../../shared/gdoc-commons/services/gdoc-data.service';
import {CommonDocAlbumResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-album.resolver';
import {GeoDocAlbumService} from '../services/gdoc-album.service';

@Injectable()
export class GeoDocAlbumResolver extends CommonDocAlbumResolver<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult,
    GeoDocDataService> {
    constructor(appService: GenericAppService, albumService: GeoDocAlbumService, dataService: GeoDocDataService) {
        super(appService, albumService, dataService);
    }
}
