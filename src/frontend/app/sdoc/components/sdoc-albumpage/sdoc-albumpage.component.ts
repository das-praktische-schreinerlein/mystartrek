import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {ActivatedRoute} from '@angular/router';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchFormConverter} from '../../../shared-sdoc/services/sdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {FormBuilder} from '@angular/forms';
import {StarDocAlbumService} from '../../../shared-sdoc/services/sdoc-album.service';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {StarDocRoutingService} from '../../../../shared/sdoc-commons/services/sdoc-routing.service';
import {
    CommonDocAlbumpageComponent,
    CommonDocAlbumpageComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-albumpage/cdoc-albumpage.component';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {environment} from '../../../../environments/environment';
import {StarDocPlaylistService} from '../../../shared-sdoc/services/sdoc-playlist.service';
import {CommonDocMultiActionManager} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-multiaction.manager';
import {StarDocActionTagService} from '../../../shared-sdoc/services/sdoc-actiontag.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {StarDocSearchFormUtils} from '../../../shared-sdoc/services/sdoc-searchform-utils.service';

@Component({
    selector: 'app-sdoc-albumpage',
    templateUrl: './sdoc-albumpage.component.html',
    styleUrls: ['../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-albumpage/cdoc-albumpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocAlbumpageComponent
    extends CommonDocAlbumpageComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {

    constructor(route: ActivatedRoute, commonRoutingService: CommonRoutingService,
                errorResolver: ErrorResolver, cdocDataService: StarDocDataService,
                searchFormConverter: StarDocSearchFormConverter, cdocRoutingService: StarDocRoutingService,
                toastr: ToastrService, pageUtils: PageUtils, cd: ChangeDetectorRef,
                trackingProvider: GenericTrackingService, public fb: FormBuilder, cdocAlbumService: StarDocAlbumService,
                appService: GenericAppService, platformService: PlatformService, layoutService: LayoutService,
                searchFormUtils: SearchFormUtils, sdocSearchFormUtils: StarDocSearchFormUtils,
                playlistService: StarDocPlaylistService, protected actionService: StarDocActionTagService) {
        super(route, commonRoutingService, errorResolver, cdocDataService, searchFormConverter, cdocRoutingService, toastr,
            pageUtils, cd, trackingProvider, fb, cdocAlbumService, appService, platformService, layoutService, searchFormUtils,
            sdocSearchFormUtils, playlistService, new CommonDocMultiActionManager(appService, actionService), environment);
    }

    protected getComponentConfig(config: {}): CommonDocAlbumpageComponentConfig {
        return {
            baseAlbumUrl: 'sdoc/album',
            baseSearchUrl: ['sdoc', ''].join('/'),
            baseSearchUrlDefault: ['sdoc', ''].join('/'),
            maxAllowedItems: config && config['sdocMaxItemsPerAlbum'] >= 0 ? config['sdocMaxItemsPerAlbum'] : -1,
            autoPlayAllowed: BeanUtils.getValue(config, 'permissions.allowAutoPlay') &&
                BeanUtils.getValue(config, 'components.sdoc-albumpage.allowAutoplay') + '' === 'true',
            m3uAvailable: BeanUtils.getValue(config, 'permissions.m3uAvailable') &&
                BeanUtils.getValue(config, 'components.sdoc-albumpage.m3uAvailable') + '' === 'true'
        };
    }
}
