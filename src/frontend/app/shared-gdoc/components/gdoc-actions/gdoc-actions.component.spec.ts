/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ComponentFactoryResolver, NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {GeoDocActionsComponent} from './gdoc-actions.component';
import {GeoDocDynamicComponentService} from '../../services/gdoc-dynamic-components.service';
import {Router} from '@angular/router';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {ToastrService} from 'ngx-toastr';
import {GeoDocAlbumService} from '../../services/gdoc-album.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {DynamicComponentService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/dynamic-components.service';
import {GeoDocActionTagService} from '../../services/gdoc-actiontag.service';
import {GeoDocPlaylistService} from '../../services/gdoc-playlist.service';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {ToastrServiceStub} from '@dps/mycms-frontend-commons/dist/testing/toasts-stubs';

describe('GeoDocActionsComponent', () => {
    let component: GeoDocActionsComponent;
    let fixture: ComponentFixture<GeoDocActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocActionsComponent],
            imports: [
            ],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                { provide: GeoDocDataService, useValue: new GeoDocDataServiceStub() },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                { provide: ToastrService, useValue: new ToastrServiceStub() },
                GeoDocDynamicComponentService,
                DynamicComponentService,
                GeoDocAlbumService,
                ComponentFactoryResolver,
                GeoDocActionTagService,
                GeoDocPlaylistService,
                CommonDocContentUtils,
                CommonDocRoutingService,
                CommonRoutingService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocActionsComponent);
        component = fixture.componentInstance;
        component.record = GeoDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
