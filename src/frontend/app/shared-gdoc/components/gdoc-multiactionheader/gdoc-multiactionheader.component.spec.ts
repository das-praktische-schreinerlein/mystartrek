/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {GeoDocMultiActionHeaderComponent} from './gdoc-multiactionheader.component';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';
import {GeoDocActionTagService} from '../../services/gdoc-actiontag.service';
import {GeoDocRoutingService} from '../../../../shared/gdoc-commons/services/gdoc-routing.service';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';

describe('GeoDocMultiActionHeaderComponent', () => {
    let component: GeoDocMultiActionHeaderComponent;
    let fixture: ComponentFixture<GeoDocMultiActionHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocMultiActionHeaderComponent],
            imports: [
            ],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                { provide: GeoDocDataService, useValue: new GeoDocDataServiceStub() },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                GeoDocRoutingService,
                GeoDocActionTagService,
                GeoDocContentUtils,
                CommonDocRoutingService,
                CommonRoutingService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocMultiActionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
