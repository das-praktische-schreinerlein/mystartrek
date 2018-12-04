import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input} from '@angular/core';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocSearchForm} from '../../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocSearchFormConverter} from '../../services/gdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonDocInlineSearchpageComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-inline-searchpage/cdoc-inline-searchpage.component';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {CommonDocMultiActionManager} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocSearchFormUtils} from '../../services/gdoc-searchform-utils.service';
import {GeoDocActionTagService} from '../../services/gdoc-actiontag.service';

@Component({
    selector: 'app-gdoc-inline-searchpage',
    templateUrl: './gdoc-inline-searchpage.component.html',
    styleUrls: ['./gdoc-inline-searchpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocInlineSearchpageComponent extends
    CommonDocInlineSearchpageComponent<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult, GeoDocDataService> {

    @Input()
    public baseSearchUrl? = 'gdoc/';

    constructor(appService: GenericAppService, commonRoutingService: CommonRoutingService,
                gdocDataService: GeoDocDataService, searchFormConverter: GeoDocSearchFormConverter,
                cdocRoutingService: GeoDocRoutingService, toastr: ToastrService,
                cd: ChangeDetectorRef, elRef: ElementRef, pageUtils: PageUtils, searchFormUtils: SearchFormUtils,
                gdocSearchFormUtils: GeoDocSearchFormUtils, protected actionService: GeoDocActionTagService) {
        super(appService, commonRoutingService, gdocDataService, searchFormConverter, cdocRoutingService,
            toastr, cd, elRef, pageUtils, searchFormUtils, gdocSearchFormUtils,
            new CommonDocMultiActionManager(appService, actionService));
    }
}
