/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeoDocSearchFormConverter} from '../../../shared-gdoc/services/gdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRouteStub} from '@dps/mycms-frontend-commons/dist/testing/router-stubs';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';
import {Angulartics2} from 'angulartics2';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {Angulartics2Stub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/angulartics2-stubs';
import {GeoDocAlbumpageComponent} from './gdoc-albumpage.component';
import {GeoDocAlbumService} from '../../../shared-gdoc/services/gdoc-album.service';
import {FormBuilder} from '@angular/forms';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {GeoDocPlaylistService} from '../../../shared-gdoc/services/gdoc-playlist.service';
import {CommonDocContentUtils} from '@dps//mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';
import {GeoDocActionTagService} from '../../../shared-gdoc/services/gdoc-actiontag.service';
import {GeoDocSearchFormUtils} from '../../../shared-gdoc/services/gdoc-searchform-utils.service';
import {ToastrServiceStub} from '@dps/mycms-frontend-commons/dist/testing/toasts-stubs';

describe('GeoDocAlbumpageComponent', () => {
    let component: GeoDocAlbumpageComponent;
    let fixture: ComponentFixture<GeoDocAlbumpageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocAlbumpageComponent],
            imports: [
                NgbModule.forRoot(),
                TranslateModule.forRoot(),
                NoopAnimationsModule
            ],
            providers: [
                { provide: GeoDocDataService, useValue: new GeoDocDataServiceStub() },
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                GeoDocSearchFormConverter,
                SearchFormUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() },
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                CommonDocRoutingService,
                GeoDocRoutingService,
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                TranslateService,
                ErrorResolver,
                PageUtils,
                GenericTrackingService,
                GeoDocAlbumService,
                FormBuilder,
                { provide: Angulartics2, useValue: new Angulartics2Stub() },
                PlatformService,
                LayoutService,
                GeoDocPlaylistService,
                CommonDocContentUtils,
                GeoDocActionTagService,
                GeoDocSearchFormUtils
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocAlbumpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
