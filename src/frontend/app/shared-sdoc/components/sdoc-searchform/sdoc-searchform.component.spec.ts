/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StarDocSearchformComponent} from './sdoc-searchform.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocSearchFormUtils} from '../../services/sdoc-searchform-utils.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {StarDocDataStore, StarDocTeamFilterConfig} from '../../../../shared/sdoc-commons/services/sdoc-data.store';
import {ToastrService} from 'ngx-toastr';
import {StarDocDataCacheService} from '../../services/sdoc-datacache.service';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {ToastrServiceStub} from '@dps/mycms-frontend-commons/dist/testing/toasts-stubs';

describe('StarDocSearchformComponent', () => {
    let component: StarDocSearchformComponent;
    let fixture: ComponentFixture<StarDocSearchformComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocSearchformComponent],
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                { provide: StarDocDataStore, useValue: new StarDocDataStore(new SearchParameterUtils(), new StarDocTeamFilterConfig()) },
                { provide: StarDocDataService, useValue: new StarDocDataServiceStub() },
                StarDocDataCacheService,
                StarDocSearchFormUtils,
                StarDocSearchFormConverter,
                SearchFormUtils,
                { provide: SearchParameterUtils, useValue: new SearchParameterUtils() },
                { provide: ToastrService, useValue: new ToastrServiceStub() }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocSearchformComponent);
        component = fixture.componentInstance;
        component.searchResult = StarDocDataServiceStub.defaultSearchResult();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
