/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataInfoComponent} from './gdoc-datainfo.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';

describe('GeoDocDataInfoComponent', () => {
    let component: GeoDocDataInfoComponent;
    let fixture: ComponentFixture<GeoDocDataInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocDataInfoComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocDataInfoComponent);
        component = fixture.componentInstance;
        component.record = GeoDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
