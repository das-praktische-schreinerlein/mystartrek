import {Injectable} from '@angular/core';
import {GeoDocDataService} from '../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocSearchResult} from '../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {CommonDocDataCacheService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-datacache.service';

@Injectable()
export class GeoDocDataCacheService extends CommonDocDataCacheService<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult,
    GeoDocDataService> {
    constructor(private gdocDataService: GeoDocDataService) {
        super(gdocDataService);
    }
}
