import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Layout, LayoutService, LayoutSizeData} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {GeoDocSearchResult} from '../../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {AngularMarkdownService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {GeoDocSearchForm} from '../../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {GeoDocSearchFormConverter} from '../../../shared-gdoc/services/gdoc-searchform-converter.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {isArray, isNumber} from 'util';
import {GeoDocContentUtils} from '../../../shared-gdoc/services/gdoc-contentutils.service';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {
    CommonDocShowpageComponent,
    CommonDocShowpageComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-showpage.component';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-gdoc-showpage',
    templateUrl: './gdoc-showpage.component.html',
    styleUrls: ['./gdoc-showpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocShowpageComponent extends CommonDocShowpageComponent<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult,
    GeoDocDataService> {
    tracks: GeoDocRecord[] = [];
    tagcloudSearchResult = new GeoDocSearchResult(new GeoDocSearchForm({}), 0, undefined, new Facets());
    flgShowMap = false;
    flgShowProfileMap = false;
    flgShowTopImages = true;
    flgMapAvailable = false;
    flgProfileMapAvailable = false;
    flgTopImagesAvailable = false;
    defaultSubImageLayout = Layout.SMALL;
    showResultListTrigger: {
        IMAGE: boolean|number;
        VIDEO: boolean|number;
        LOCATION: boolean|number;
        NEWS: boolean|number;
        ROUTE: boolean|number;
        TOPIMAGE: boolean|number;
        TRACK: boolean|number;
        TRIP: boolean|number;
    } = {
        IMAGE: false,
        VIDEO: false,
        LOCATION: false,
        NEWS: false,
        ROUTE: false,
        TOPIMAGE: false,
        TRACK: false,
        TRIP: false
    };
    availableTabs = {
        'IMAGE': true,
        'ROUTE': true,
        'TRACK': true,
        'LOCATION': true,
        'TRIP': true,
        'VIDEO': true,
        'NEWS': true
    };
    private layoutSize: LayoutSizeData;

    constructor(route: ActivatedRoute, cdocRoutingService: GeoDocRoutingService,
                toastr: ToastrService, contentUtils: GeoDocContentUtils,
                errorResolver: ErrorResolver, pageUtils: PageUtils, commonRoutingService: CommonRoutingService,
                angularMarkdownService: AngularMarkdownService, angularHtmlService: AngularHtmlService,
                cd: ChangeDetectorRef, trackingProvider: GenericTrackingService, appService: GenericAppService,
                platformService: PlatformService, protected searchFormConverter: GeoDocSearchFormConverter,
                layoutService: LayoutService) {
        super(route, cdocRoutingService, toastr, contentUtils, errorResolver, pageUtils, commonRoutingService,
            angularMarkdownService, angularHtmlService, cd, trackingProvider, appService, platformService, layoutService, environment);
    }

    onRouteTracksFound(searchresult: GeoDocSearchResult) {
        this.onTackCloudRoutesFound(searchresult);
        this.onTracksFound(searchresult);
    }

    onTackCloudRoutesFound(searchresult: GeoDocSearchResult) {
        this.tagcloudSearchResult = searchresult;
    }

    onTracksFound(searchresult: GeoDocSearchResult) {
        const realTracks = [];
        if (searchresult !== undefined && searchresult.currentRecords !== undefined) {
            for (const record of searchresult.currentRecords) {
                if (record.gpsTrackBasefile || record.geoLoc !== undefined
                    || (record.gpsTrackSrc !== undefined && record.gpsTrackSrc.length > 20)) {
                    realTracks.push(record);
                    this.flgMapAvailable = true;
                    this.flgProfileMapAvailable = true;

                    this.flgShowMap = this.flgMapAvailable;
                    this.calcShowMaps();
                }
            }
        }
        this.tracks = realTracks;

        this.cd.markForCheck();
    }

    onTopImagesFound(searchResult: GeoDocSearchResult) {
        if (searchResult === undefined || searchResult.recordCount <= 3) {
            this.flgTopImagesAvailable = false;
        } else {
            this.flgTopImagesAvailable = true;
        }
        this.flgShowTopImages = this.flgTopImagesAvailable;
        if (!this.layoutService.isDesktop()) {
            this.flgShowTopImages = false;
        }
        this.cd.markForCheck();

        return false;
    }

    onTagcloudClicked(filterValue: any, filter: string) {
        const filters = this.getFiltersForType(this.record, 'ROUTE');
        filters[filter] = filterValue;
        const searchForm = new GeoDocSearchForm(filters);
        const url = this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, searchForm);
        this.commonRoutingService.navigateByUrl(url);

        return false;
    }


    getFiltersForType(record: GeoDocRecord, type: string): any {
        const minPerPage = isNumber(this.showResultListTrigger[type]) ? this.showResultListTrigger[type] : 0;

        const filters = (<GeoDocContentUtils>this.contentUtils).getGeoDocSubItemFiltersForType(record, type,
            (this.pdoc ? this.pdoc.theme : undefined), minPerPage);
        if (type === 'TOPIMAGE') {
            if (this.layoutSize && this.layoutSize.width > 1200 && this.layoutSize.width < 1480) {
                filters['perPage'] = 3;
            }
        }

        return filters;
    }

    protected onResize(layoutSizeData: LayoutSizeData): void {
        super.onResize(layoutSizeData);
        this.layoutSize = layoutSizeData;
        this.cd.markForCheck();
    }

    protected getComponentConfig(config: {}): CommonDocShowpageComponentConfig {
        return {
            baseSearchUrl: ['gdoc'].join('/'),
            baseSearchUrlDefault: ['gdoc'].join('/')
        };
    }

    protected configureProcessingOfResolvedData(): void {
        const me = this;
        const config = me.appService.getAppConfig();
        if (BeanUtils.getValue(config, 'components.gdoc-showpage.showBigImages') === true) {
            this.defaultSubImageLayout = Layout.BIG;
        }
        if (BeanUtils.getValue(config, 'components.gdoc-showpage.availableTabs') !== undefined) {
            me.availableTabs = BeanUtils.getValue(config, 'components.gdoc-showpage.availableTabs');
        }
        if (isArray(BeanUtils.getValue(config, 'components.gdoc-showpage.allowedQueryParams'))) {
            const allowedParams = BeanUtils.getValue(config, 'components.gdoc-showpage.allowedQueryParams');
            for (const type in me.showResultListTrigger) {
                const paramName = 'show' + type;
                if (allowedParams.indexOf(paramName) >= 0 && me.queryParamMap && me.queryParamMap.get(paramName)) {
                    me.showResultListTrigger[type] =
                        GeoDocSearchForm.genericFields.perPage.validator.sanitize(me.queryParamMap.get(paramName));
                }
            }
        }
    }

    protected getConfiguredIndexableTypes(config: {}): string[] {
        let indexableTypes = [];
        if (BeanUtils.getValue(config, 'services.seo.gdocIndexableTypes')) {
            indexableTypes = config['services']['seo']['gdocIndexableTypes'];
        }

        return indexableTypes;
    }

    protected doProcessAfterResolvedData(): void {
        const me = this;
        me.tagcloudSearchResult = new GeoDocSearchResult(new GeoDocSearchForm({}), 0, undefined, new Facets());

        if (me.record.gpsTrackBasefile || me.record.geoLoc !== undefined
            || (me.record.gpsTrackSrc !== undefined && me.record.gpsTrackSrc.length > 20)) {
            me.tracks = [me.record];
            me.flgMapAvailable = true;
            me.flgProfileMapAvailable = (me.record.gpsTrackBasefile !== undefined
                || (me.record.gpsTrackSrc !== undefined && me.record.gpsTrackSrc.length > 20));
        } else {
            me.tracks = [];
            me.flgMapAvailable = false;
            me.flgProfileMapAvailable = false;
        }

        me.flgShowMap = this.flgMapAvailable;
        me.calcShowMaps();
        me.flgTopImagesAvailable = true;
        me.flgShowTopImages = true;
    }

    private calcShowMaps() {
        if (this.layoutService.isSpider() || this.layoutService.isServer()) {
            this.flgShowProfileMap = false;
            this.flgShowMap = false;
            return;
        }
        if (!this.flgProfileMapAvailable) {
            this.flgShowProfileMap = false;
            return;
        }
        if (!this.layoutService.isDesktop() &&
            (this.record.type === 'LOCATION' || this.record.type === 'TRIP' || this.record.type === 'NEWS')) {
            this.flgShowProfileMap = false;
            return;
        }

        this.flgShowProfileMap = true;
    }
}
