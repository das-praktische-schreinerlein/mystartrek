import {Injectable} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {GeoDocDataService} from '../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {CommonDocRecordResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-details.resolver';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../../../shared/gdoc-commons/model/container/gdoc-searchresult';

@Injectable()
export class GeoDocRecordResolver extends CommonDocRecordResolver<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult,
    GeoDocDataService> {
    constructor(appService: GenericAppService, dataService: GeoDocDataService) {
        super(appService, dataService);
    }
}
