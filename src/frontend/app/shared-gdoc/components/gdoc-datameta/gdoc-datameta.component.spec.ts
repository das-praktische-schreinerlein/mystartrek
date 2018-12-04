/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {GeoDocDataServiceStub} from '../../../../testing/gdoc-dataservice-stubs';
import {GeoDocDataMetaComponent} from './gdoc-datameta.component';

describe('GeoDocDataMetaComponent', () => {
    let component: GeoDocDataMetaComponent;
    let fixture: ComponentFixture<GeoDocDataMetaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GeoDocDataMetaComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GeoDocDataMetaComponent);
        component = fixture.componentInstance;
        component.record = GeoDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
