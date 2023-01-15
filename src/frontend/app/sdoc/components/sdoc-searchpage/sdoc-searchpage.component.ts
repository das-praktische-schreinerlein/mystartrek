import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {ActivatedRoute} from '@angular/router';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchFormConverter} from '../../../shared-sdoc/services/sdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {
    GenericTrackingService
} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {
    CommonDocSearchpageComponent,
    CommonDocSearchpageComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-searchpage.component';
import {StarDocRoutingService} from '../../../../shared/sdoc-commons/services/sdoc-routing.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {environment} from '../../../../environments/environment';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {StarDocActionTagService} from '../../../shared-sdoc/services/sdoc-actiontag.service';
import {StarDocSearchFormUtils} from '../../../shared-sdoc/services/sdoc-searchform-utils.service';
import {
    CommonDocMultiActionManager
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';

@Component({
    selector: 'app-sdoc-searchpage',
    templateUrl: './sdoc-searchpage.component.html',
    styleUrls: ['./sdoc-searchpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocSearchpageComponent extends CommonDocSearchpageComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    mapZoom = 9;
    flgShowMap = false;
    flgMapAvailable = false;

    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService, errorResolver: ErrorResolver,
                sdocDataService: StarDocDataService, searchFormConverter: StarDocSearchFormConverter,
                cdocRoutingService: StarDocRoutingService, toastr: ToastrService, pageUtils: PageUtils,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, layoutService: LayoutService, searchFormUtils: SearchFormUtils,
                sdocSearchFormUtils: StarDocSearchFormUtils, protected actionService: StarDocActionTagService) {
        super(route, commonRoutingService, errorResolver, sdocDataService, searchFormConverter, cdocRoutingService,
            toastr, pageUtils, cd, trackingProvider, appService, platformService, layoutService, searchFormUtils,
            sdocSearchFormUtils, new CommonDocMultiActionManager(appService, actionService), environment);
    }

    onMapStarDocClicked(sdoc: StarDocRecord) {
        console.log("sdocClicked", sdoc);
    }

    protected getComponentConfig(config: {}): CommonDocSearchpageComponentConfig {
        return {
            baseSearchUrl: ['sdoc'].join('/'),
            baseSearchUrlDefault: ['sdoc'].join('/'),
            availableCreateActionTypes: [],
            maxAllowedM3UExportItems: BeanUtils.getValue(config, 'services.serverItemExport.maxAllowedM3UItems')
        };
    }

    protected doPreChecksBeforeSearch(): boolean {
        if (this.searchForm.sort === 'distance' && (this.searchForm.nearby === undefined || this.searchForm.nearby === '')) {
            // console.log('doSearch: redirect because of sort/nearby form:', this.searchForm);
            this.searchForm.sort = 'relevance';
            this.sort = 'relvance';
            return this.redirectToSearch();
        }

        return super.doPreChecksBeforeSearch();
    }

    protected doCheckSearchResultAfterSearch(searchResult: StarDocSearchResult): void {
        super.doCheckSearchResultAfterSearch(searchResult);

        if (searchResult === undefined) {
            // console.log('empty searchResult', sdocSearchResult);
            this.flgMapAvailable = false;
        } else {
            // console.log('update searchResult', sdocSearchResult);
            this.flgMapAvailable = this.searchResult.recordCount > 0;
        }

        this.flgShowMap = this.flgMapAvailable;
        this.calcShowMaps();
    }

    private calcShowMaps() {
        if (this.layoutService.isSpider() || this.layoutService.isServer()) {
            this.flgShowMap = false;
            return;
        }
    }
}
