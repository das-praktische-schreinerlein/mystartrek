import {Injectable} from '@angular/core';
import {StarDocSearchFormConverter} from '../services/sdoc-searchform-converter.service';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonDocSearchFormResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-searchform.resolver';

@Injectable()
export class StarDocSearchFormResolver extends CommonDocSearchFormResolver<StarDocSearchForm> {
    constructor(appService: GenericAppService, searchFormConverter: StarDocSearchFormConverter) {
        super(appService, searchFormConverter);
    }
}
