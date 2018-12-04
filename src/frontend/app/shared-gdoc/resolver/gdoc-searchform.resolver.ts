import {Injectable} from '@angular/core';
import {GeoDocSearchFormConverter} from '../services/gdoc-searchform-converter.service';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocSearchFormResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-searchform.resolver';

@Injectable()
export class GeoDocSearchFormResolver extends CommonDocSearchFormResolver<GeoDocSearchForm> {
    constructor(appService: GenericAppService, searchFormConverter: GeoDocSearchFormConverter) {
        super(appService, searchFormConverter);
    }
}
