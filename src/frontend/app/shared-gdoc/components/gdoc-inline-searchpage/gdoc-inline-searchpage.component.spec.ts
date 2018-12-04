/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GeoDocInlineSearchpageComponent} from './gdoc-inline-searchpage.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeoDocDataStore, GeoDocTeamFilterConfig} from '../../../../shared/gdoc-commons/services/gdoc-data.store';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {GeoDocSearchFormConverter} from '../../services/gdoc-searchform-converter.service';
import {ToastrService} from 'ngx-toastr';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {TranslateModule} from '@ngx-translate/core';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {ActivatedRouteStub} from '@dps/mycms-frontend-commons/dist/testing/router-stubs';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {GeoDocSearchFormUtils} from '../../services/gdoc-searchform-utils.service';
import {GeoDocActionTagService} from '../../services/gdoc-actiontag.service';
import {GeoDocAlbumService} from '../../services/gdoc-album.service';
import {GeoDocPlaylistService} from '../../services/gdoc-playlist.service';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';
import {ToastrServiceStub} from '@dps/mycms-frontend-commons/dist/testing/toasts-stubs';

describe('GeoDocInlineSearchpageComponent', () => {
    let component: GeoDocInlineSearchpageComponent;
    let fixture: ComponentFixture<GeoDocInlineSearchpageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocInlineSearchpageComponent],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: GeoDocDataStore, useValue: new GeoDocDataStore(new SearchParameterUtils(), new GeoDocTeamFilterConfig()) },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                { provide: GeoDocDataService, useValue: new GeoDocDataServiceStub() },
                { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                SearchFormUtils,
                GeoDocSearchFormConverter,
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                CommonDocRoutingService,
                GeoDocRoutingService,
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                PageUtils,
                GeoDocSearchFormUtils,
                GeoDocActionTagService,
                GeoDocAlbumService,
                GeoDocPlaylistService,
                CommonDocContentUtils
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocInlineSearchpageComponent);
        component = fixture.componentInstance;
        component.params = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
