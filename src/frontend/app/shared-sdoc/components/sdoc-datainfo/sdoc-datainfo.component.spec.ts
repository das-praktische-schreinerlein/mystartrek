/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StarDocDataInfoComponent} from './sdoc-datainfo.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';

describe('StarDocDataInfoComponent', () => {
    let component: StarDocDataInfoComponent;
    let fixture: ComponentFixture<StarDocDataInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocDataInfoComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocDataInfoComponent);
        component = fixture.componentInstance;
        component.record = StarDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
