import {Injectable} from '@angular/core';
import {Lightbox} from 'ngx-lightbox';
import {GeoDocSearchResult} from '../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocContentUtils} from './gdoc-contentutils.service';
import {CommonDocLightBoxService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-lightbox.service';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocSearchForm} from '../../../shared/gdoc-commons/model/forms/gdoc-searchform';

@Injectable()
export class GeoDocLightBoxService extends CommonDocLightBoxService<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult> {
    constructor(protected contentUtils: GeoDocContentUtils, protected lightbox: Lightbox) {
        super(contentUtils, lightbox);
    }
}
