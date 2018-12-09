/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';
import {StarDocMultiActionHeaderComponent} from './sdoc-multiactionheader.component';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';
import {StarDocActionTagService} from '../../services/sdoc-actiontag.service';
import {StarDocRoutingService} from '../../../../shared/sdoc-commons/services/sdoc-routing.service';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {Router} from '@angular/router';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';

describe('StarDocMultiActionHeaderComponent', () => {
    let component: StarDocMultiActionHeaderComponent;
    let fixture: ComponentFixture<StarDocMultiActionHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocMultiActionHeaderComponent],
            imports: [
            ],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                { provide: StarDocDataService, useValue: new StarDocDataServiceStub() },
                { provide: GenericAppService, useValue: new AppServiceStub() },
                StarDocRoutingService,
                StarDocActionTagService,
                StarDocContentUtils,
                CommonDocRoutingService,
                CommonRoutingService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocMultiActionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
