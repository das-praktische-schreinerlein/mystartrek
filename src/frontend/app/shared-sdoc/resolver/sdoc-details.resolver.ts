import {Injectable} from '@angular/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {StarDocDataService} from '../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {CommonDocRecordResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/cdoc-details.resolver';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../shared/sdoc-commons/model/container/sdoc-searchresult';

@Injectable()
export class StarDocRecordResolver extends CommonDocRecordResolver<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    constructor(appService: GenericAppService, dataService: StarDocDataService) {
        super(appService, dataService);
    }
}
