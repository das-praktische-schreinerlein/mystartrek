/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StarDocListItemPageComponent} from './sdoc-list-item-page.component';
import {Router} from '@angular/router';
import {
    CommonDocRoutingService
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {AppServiceStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/appservice-stubs';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {RouterStub} from '@dps/mycms-frontend-commons/dist/angular-commons/testing/router-stubs';
import {StarDocDateFormatPipe} from '../../pipes/sdoc-dateformat.pipe';
import {DatePipe} from '@angular/common';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {
    AngularMarkdownService
} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {HttpClientModule} from '@angular/common/http';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {NgxMdModule, NgxMdService} from 'ngx-md';

describe('StarDocListItemPageComponent', () => {
    let component: StarDocListItemPageComponent;
    let fixture: ComponentFixture<StarDocListItemPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocListItemPageComponent, StarDocDateFormatPipe],
            providers: [
                { provide: Router, useValue: new RouterStub() },
                PlatformService,
                { provide: StarDocDataService, useValue: new StarDocDataServiceStub() },
                SearchParameterUtils,
                StarDocSearchFormConverter,
                CommonRoutingService,
                CommonDocRoutingService,
                SearchFormUtils,
                StarDocContentUtils,
                NgxMdService,
                AngularMarkdownService,
                AngularHtmlService,
                DatePipe,
                { provide: GenericAppService, useValue: new AppServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                NgxMdModule.forRoot(),
                HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocListItemPageComponent);
        component = fixture.componentInstance;
        component.record = StarDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
