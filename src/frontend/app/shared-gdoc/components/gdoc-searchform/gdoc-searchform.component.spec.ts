/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GeoDocSearchformComponent} from './gdoc-searchform.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {GeoDocSearchFormUtils} from '../../services/gdoc-searchform-utils.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {GeoDocSearchFormConverter} from '../../services/gdoc-searchform-converter.service';
import {GeoDocDataStore, GeoDocTeamFilterConfig} from '../../../../shared/gdoc-commons/services/gdoc-data.store';
import {ToastrService} from 'ngx-toastr';
import {GeoDocDataCacheService} from '../../services/gdoc-datacache.service';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {ToastrServiceStub} from '@dps/mycms-frontend-commons/dist/testing/toasts-stubs';

describe('GeoDocSearchformComponent', () => {
    let component: GeoDocSearchformComponent;
    let fixture: ComponentFixture<GeoDocSearchformComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocSearchformComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: GeoDocDataStore, useValue: new GeoDocDataStore(new SearchParameterUtils(), new GeoDocTeamFilterConfig()) },
                { provide: GeoDocDataService, useValue: new GeoDocDataServiceStub() },
                GeoDocDataCacheService,
                GeoDocSearchFormUtils,
                GeoDocSearchFormConverter,
                SearchFormUtils,
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                { provide: ToastrService, useValue: new ToastrServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocSearchformComponent);
        component = fixture.componentInstance;
        component.searchResult = GeoDocDataServiceStub.defaultSearchResult();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
