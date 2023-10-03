import {NgModule} from '@angular/core';
import {SectionsRoutingModule} from './sections-routing.module';
import {SectionsBaseUrlResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import {SectionsPDocRecordResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgbCollapseModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionsPDocsResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-pdocs.resolver';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {TranslateModule} from '@ngx-translate/core';
import {FrontendCommonDocCommonsModule} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/frontend-cdoc-commons.module';
import {FrontendSectionCommonsModule} from '@dps/mycms-frontend-commons/dist/frontend-section-commons/frontend-section-commons.module';
import {SharedStarDocModule} from '../shared-sdoc/shared-sdoc.module';

@NgModule({
    declarations: [
    ],
    imports: [
        TranslateModule,
        NgbCollapseModule, NgbTabsetModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FrontendSectionCommonsModule,
        SharedStarDocModule,
        SectionsRoutingModule,
        FrontendCommonDocCommonsModule
    ],
    providers: [
        CommonRoutingService,
        CommonDocRoutingService,
        SectionsBaseUrlResolver,
        SectionsPDocRecordResolver,
        SectionsPDocsResolver,
        ErrorResolver,
        PageUtils
    ]
})
export class SectionsModule {
}
