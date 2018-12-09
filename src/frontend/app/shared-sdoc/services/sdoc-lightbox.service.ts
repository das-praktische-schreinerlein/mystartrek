import {Injectable} from '@angular/core';
import {Lightbox} from 'ngx-lightbox';
import {StarDocSearchResult} from '../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocContentUtils} from './sdoc-contentutils.service';
import {CommonDocLightBoxService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-lightbox.service';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocSearchForm} from '../../../shared/sdoc-commons/model/forms/sdoc-searchform';

@Injectable()
export class StarDocLightBoxService extends CommonDocLightBoxService<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    constructor(protected contentUtils: StarDocContentUtils, protected lightbox: Lightbox) {
        super(contentUtils, lightbox);
    }
}
