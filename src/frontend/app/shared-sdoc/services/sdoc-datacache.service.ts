import {Injectable} from '@angular/core';
import {StarDocDataService} from '../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocSearchResult} from '../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {CommonDocDataCacheService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-datacache.service';

@Injectable()
export class StarDocDataCacheService extends CommonDocDataCacheService<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    constructor(private sdocDataService: StarDocDataService) {
        super(sdocDataService);
    }
}
