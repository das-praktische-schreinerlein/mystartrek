/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StarDocDataTechComponent} from './sdoc-datatech.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';

describe('StarDocDataTechComponent', () => {
    let component: StarDocDataTechComponent;
    let fixture: ComponentFixture<StarDocDataTechComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocDataTechComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocDataTechComponent);
        component = fixture.componentInstance;
        component.record = StarDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
