/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {StarDocDataServiceStub} from '../../../../testing/sdoc-dataservice-stubs';
import {StarDocDataMetaComponent} from './sdoc-datameta.component';

describe('StarDocDataMetaComponent', () => {
    let component: StarDocDataMetaComponent;
    let fixture: ComponentFixture<StarDocDataMetaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StarDocDataMetaComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule.forRoot(),
                TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StarDocDataMetaComponent);
        component = fixture.componentInstance;
        component.record = StarDocDataServiceStub.defaultRecord();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
