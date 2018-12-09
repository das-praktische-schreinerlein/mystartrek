import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input} from '@angular/core';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonDocInlineSearchpageComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-inline-searchpage/cdoc-inline-searchpage.component';
import {StarDocRoutingService} from '../../../../shared/sdoc-commons/services/sdoc-routing.service';
import {CommonDocMultiActionManager} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {StarDocSearchFormUtils} from '../../services/sdoc-searchform-utils.service';
import {StarDocActionTagService} from '../../services/sdoc-actiontag.service';

@Component({
    selector: 'app-sdoc-inline-searchpage',
    templateUrl: './sdoc-inline-searchpage.component.html',
    styleUrls: ['./sdoc-inline-searchpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocInlineSearchpageComponent extends
    CommonDocInlineSearchpageComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {

    @Input()
    public baseSearchUrl? = 'sdoc/';

    constructor(appService: GenericAppService, commonRoutingService: CommonRoutingService,
                sdocDataService: StarDocDataService, searchFormConverter: StarDocSearchFormConverter,
                cdocRoutingService: StarDocRoutingService, toastr: ToastrService,
                cd: ChangeDetectorRef, elRef: ElementRef, pageUtils: PageUtils, searchFormUtils: SearchFormUtils,
                sdocSearchFormUtils: StarDocSearchFormUtils, protected actionService: StarDocActionTagService) {
        super(appService, commonRoutingService, sdocDataService, searchFormConverter, cdocRoutingService,
            toastr, cd, elRef, pageUtils, searchFormUtils, sdocSearchFormUtils,
            new CommonDocMultiActionManager(appService, actionService));
    }
}
