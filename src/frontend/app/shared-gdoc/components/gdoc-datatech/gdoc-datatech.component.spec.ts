/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GeoDocDataTechComponent} from './gdoc-datatech.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';

describe('GeoDocDataTechComponent', () => {
    let component: GeoDocDataTechComponent;
    let fixture: ComponentFixture<GeoDocDataTechComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocDataTechComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocDataTechComponent);
        component = fixture.componentInstance;
        component.record = GeoDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
