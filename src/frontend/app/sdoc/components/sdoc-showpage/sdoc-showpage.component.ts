import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Layout, LayoutService, LayoutSizeData} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {AngularMarkdownService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {StarDocSearchFormConverter} from '../../../shared-sdoc/services/sdoc-searchform-converter.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {isArray, isNumber} from 'util';
import {StarDocContentUtils} from '../../../shared-sdoc/services/sdoc-contentutils.service';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {
    CommonDocShowpageComponent,
    CommonDocShowpageComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-showpage.component';
import {StarDocRoutingService} from '../../../../shared/sdoc-commons/services/sdoc-routing.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-sdoc-showpage',
    templateUrl: './sdoc-showpage.component.html',
    styleUrls: ['./sdoc-showpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocShowpageComponent extends CommonDocShowpageComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult,
    StarDocDataService> {
    tracks: StarDocRecord[] = [];
    tagcloudSearchResult = new StarDocSearchResult(new StarDocSearchForm({}), 0, undefined, new Facets());
    flgShowMap = false;
    flgMapAvailable = false;
    private layoutSize: LayoutSizeData;

    constructor(route: ActivatedRoute, cdocRoutingService: StarDocRoutingService,
                toastr: ToastrService, contentUtils: StarDocContentUtils,
                errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService,
                angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, protected searchFormConverter: StarDocSearchFormConverter,
                layoutService: LayoutService) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService,
            angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment);
    }

    onRouteTracksFound(searchresult: StarDocSearchResult) {
        this.onTackCloudRoutesFound(searchresult);
        this.onTracksFound(searchresult);
    }

    onTackCloudRoutesFound(searchresult: StarDocSearchResult) {
        this.tagcloudSearchResult = searchresult;
    }

    onTracksFound(searchresult: StarDocSearchResult) {
        const realTracks = [];
        if (searchresult !== undefined && searchresult.currentRecords !== undefined) {
            for (const record of searchresult.currentRecords) {
                if (record.designator || record.geoLoc !== undefined
                    || (record.magnitude !== undefined && record.magnitude.length > 20)) {
                    realTracks.push(record);
                    this.flgMapAvailable = true;

                    this.flgShowMap = this.flgMapAvailable;
                    this.calcShowMaps();
                }
            }
        }
        this.tracks = realTracks;

        this.cd.markForCheck();
    }

    protected onResize(layoutSizeData: LayoutSizeData): void {
        super.onResize(layoutSizeData);
        this.layoutSize = layoutSizeData;
        this.cd.markForCheck();
    }

    protected getComponentConfig(config: {}): CommonDocShowpageComponentConfig {
        return {
            baseSearchUrl: ['sdoc'].join('/'),
            baseSearchUrlDefault: ['sdoc'].join('/')
        };
    }

    protected configureProcessingOfResolvedData(): void {
        const me = this;
        const config = me.appService.getAppConfig();
    }

    protected getConfiguredIndexableTypes(config: {}): string[] {
        let indexableTypes = [];
        if (BeanUtils.getValue(config, 'services.seo.sdocIndexableTypes')) {
            indexableTypes = config['services']['seo']['sdocIndexableTypes'];
        }

        return indexableTypes;
    }

    protected doProcessAfterResolvedData(): void {
        const me = this;
        me.tagcloudSearchResult = new StarDocSearchResult(new StarDocSearchForm({}), 0, undefined, new Facets());

        if (me.record.designator || me.record.geoLoc !== undefined
            || (me.record.magnitude !== undefined && me.record.magnitude.length > 20)) {
            me.tracks = [me.record];
            me.flgMapAvailable = true;
        } else {
            me.tracks = [];
            me.flgMapAvailable = false;
        }

        me.flgShowMap = this.flgMapAvailable;
        me.calcShowMaps();
    }

    private calcShowMaps() {
        if (this.layoutService.isSpider() || this.layoutService.isServer()) {
            this.flgShowMap = false;
            return;
        }
    }
}
