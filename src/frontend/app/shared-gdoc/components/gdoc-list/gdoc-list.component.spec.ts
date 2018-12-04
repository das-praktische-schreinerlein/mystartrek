/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocListComponent} from './gdoc-list.component';
import {GeoDocSearchFormConverter} from '../../services/gdoc-searchform-converter.service';
import {TranslateModule} from '@ngx-translate/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {Lightbox, LightboxConfig, LightboxEvent} from 'ngx-lightbox';
import {GeoDocLightBoxService} from '../../services/gdoc-lightbox.service';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';

describe('GeoDocListComponent', () => {
    let component: GeoDocListComponent;
    let fixture: ComponentFixture<GeoDocListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocListComponent],
            imports: [
                TranslateModule.forRoot()
            ],
            providers: [
                GeoDocSearchFormConverter,
                { provide: Router, useValue: new RouterStub() },
                CommonRoutingService,
                CommonDocRoutingService,
                CommonDocContentUtils,
                GeoDocContentUtils,
                LightboxEvent,
                LightboxConfig,
                Lightbox,
                GeoDocLightBoxService,
                SearchFormUtils,
                { provide: GenericAppService, useValue: new AppServiceStub() },
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocListComponent);
        component = fixture.componentInstance;
        component.searchResult = GeoDocDataServiceStub.defaultSearchResult();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
