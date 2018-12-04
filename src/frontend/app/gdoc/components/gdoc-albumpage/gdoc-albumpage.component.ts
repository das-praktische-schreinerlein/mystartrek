import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {ActivatedRoute} from '@angular/router';
import {GeoDocSearchForm} from '../../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GeoDocSearchFormConverter} from '../../../shared-gdoc/services/gdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {FormBuilder} from '@angular/forms';
import {GeoDocAlbumService} from '../../../shared-gdoc/services/gdoc-album.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {
    CommonDocAlbumpageComponent,
    CommonDocAlbumpageComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-albumpage/cdoc-albumpage.component';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {environment} from '../../../../environments/environment';
import {GeoDocPlaylistService} from '../../../shared-gdoc/services/gdoc-playlist.service';
import {CommonDocMultiActionManager} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {GeoDocActionTagService} from '../../../shared-gdoc/services/gdoc-actiontag.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocSearchFormUtils} from '../../../shared-gdoc/services/gdoc-searchform-utils.service';

@Component({
    selector: 'app-gdoc-albumpage',
    templateUrl: './gdoc-albumpage.component.html',
    styleUrls: ['../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-albumpage/cdoc-albumpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocAlbumpageComponent
    extends CommonDocAlbumpageComponent<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult, GeoDocDataService> {

    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService,
                errorResolver: ErrorResolver, cdocDataService: GeoDocDataService,
                searchFormConverter: GeoDocSearchFormConverter, cdocRoutingService: GeoDocRoutingService,
                toastr: ToastrService, pageUtils: PageUtils, cd: ChangeDetectorRef,
                trackingProvider: GenericTrackingService, public fb: FormBuilder, cdocAlbumService: GeoDocAlbumService,
                appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService,
                searchFormUtils: SearchFormUtils, gdocSearchFormUtils: GeoDocSearchFormUtils,
                playlistService: GeoDocPlaylistService, protected actionService: GeoDocActionTagService) {
        super(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr,
            pageUtils, cd, trackingProvider, fb, cdocAlbumService, appService, platformService, layoutService, searchFormUtils,
            gdocSearchFormUtils, playlistService, new CommonDocMultiActionManager(appService, actionService), environment);
    }

    protected getComponentConfig(config: {}): CommonDocAlbumpageComponentConfig {
        return {
            baseAlbumUrl: 'gdoc/album',
            baseSearchUrl: ['gdoc', ''].join('/'),
            baseSearchUrlDefault: ['gdoc', ''].join('/'),
            maxAllowedItems: config && config['gdocMaxItemsPerAlbum'] >= 0 ? config['gdocMaxItemsPerAlbum'] : -1,
            autoPlayAllowed: BeanUtils.getValue(config, 'permissions.allowAutoPlay') &&
                BeanUtils.getValue(config, 'components.gdoc-albumpage.allowAutoplay') + '' === 'true',
            m3uAvailable: BeanUtils.getValue(config, 'permissions.m3uAvailable') &&
                BeanUtils.getValue(config, 'components.gdoc-albumpage.m3uAvailable') + '' === 'true'
        };
    }
}
