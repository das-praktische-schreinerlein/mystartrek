/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {StarDocDistanceComponent} from './sdoc-distance.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';

describe('StarDocDistanceComponent', () => {
    let component: StarDocDistanceComponent;
    let fixture: ComponentFixture<StarDocDistanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocDistanceComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocDistanceComponent);
        component = fixture.componentInstance;
        component.record = StarDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
