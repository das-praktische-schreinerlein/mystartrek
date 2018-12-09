import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {StarDocSearchpageComponent} from './components/sdoc-searchpage/sdoc-searchpage.component';
import {StarDocSearchFormConverter} from '../shared-sdoc/services/sdoc-searchform-converter.service';
import {StarDocShowpageComponent} from './components/sdoc-showpage/sdoc-showpage.component';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {StarDocSearchFormUtils} from '../shared-sdoc/services/sdoc-searchform-utils.service';
import {StarDocSearchFormResolver} from '../shared-sdoc/resolver/sdoc-searchform.resolver';
import {StarDocRecordResolver} from '../shared-sdoc/resolver/sdoc-details.resolver';
import {StarDocRoutingModule} from './sdoc-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';
import {SharedStarDocModule} from '../shared-sdoc/shared-sdoc.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularCommonsModule} from '@dps/mycms-frontend-commons/dist/angular-commons/angular-commons.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ErrorResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/error.resolver';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {StarDocLightBoxService} from '../shared-sdoc/services/sdoc-lightbox.service';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {AngularMarkdownService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {StarDocAlbumResolver} from '../shared-sdoc/resolver/sdoc-album.resolver';
import {StarDocAlbumpageComponent} from './components/sdoc-albumpage/sdoc-albumpage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {StarDocDataService} from '../../shared/sdoc-commons/services/sdoc-data.service';
import {FileDropModule} from 'ngx-file-drop';
import {StarDocContentUtils} from '../shared-sdoc/services/sdoc-contentutils.service';
import {CommonDocSearchFormUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-searchform-utils.service';
import {FrontendCommonDocCommonsModule} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/frontend-cdoc-commons.module';
import {StarDocRoutingService} from '../../../shared/sdoc-commons/services/sdoc-routing.service';

@NgModule({
    declarations: [
        StarDocSearchpageComponent,
        StarDocShowpageComponent,
        StarDocAlbumpageComponent
    ],
    imports: [
        TranslateModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ToastrModule,
        HttpClientModule,
        AngularCommonsModule,
        SharedStarDocModule,
        StarDocRoutingModule,
        FileDropModule,
        FrontendCommonDocCommonsModule
    ],
    providers: [
        TranslateService,
        CommonRoutingService,
        StarDocSearchFormConverter,
        { provide: CommonDocRoutingService, useClass: StarDocRoutingService },
        StarDocRoutingService,
        { provide: CommonDocSearchFormUtils, useClass: StarDocSearchFormUtils },
        StarDocSearchFormUtils,
        SearchParameterUtils,
        { provide: CommonDocContentUtils, useClass: StarDocContentUtils },
        StarDocContentUtils,
        StarDocSearchFormResolver,
        StarDocRecordResolver,
        ErrorResolver,
        PageUtils,
        StarDocLightBoxService,
        StarDocDataService,
        AngularHtmlService,
        AngularMarkdownService,
        StarDocAlbumResolver,
        LayoutService
    ],
    exports: [
        StarDocSearchpageComponent
    ]
})
export class StarDocModule {}
