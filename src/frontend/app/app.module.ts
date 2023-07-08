import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {AppRoutingModule} from './app.router';
import {AppCommonModule} from './app.common.module';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {PDocAdminModule} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/pdoc-admin/pdoc-admin.module';
import {SharedAdminPDocModule} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/shared-admin-pdoc.module';
import {
    PDocAssignFormComponent
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/components/pdoc-assignform/pdoc-assignform.component';
import {
    PDocReplaceFormComponent
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/components/pdoc-replaceform/pdoc-replaceform.component';
import {
    PDocNameSuggesterService
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/services/pdoc-name-suggester.service';
import {
    PDocDescSuggesterService
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/services/pdoc-desc-suggester.service';
import {
    PDocPageDescSuggesterService
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/services/pdoc-page-desc-suggester.service';
import {PDocActionTagService} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-pdoc/services/pdoc-actiontag.service';
import {
    PDocAdminActionTagService
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-admin-pdoc/services/pdoc-admin-actiontag.service';
import {PDocDataCacheService} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-pdoc/services/pdoc-datacache.service';
import {
    PDocActionTagsComponent
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-pdoc/components/pdoc-actiontags/pdoc-actiontags.component';
import {
    PDocDynamicComponentService
} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-pdoc/services/pdoc-dynamic-components.service';
import {PDocAlbumService} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-module/shared-pdoc/services/pdoc-album.service';
import {environment} from '../environments/environment';
import {COMMON_APP_ENVIRONMENT} from '@dps/mycms-frontend-commons/dist/frontend-section-commons/common-environment';

registerLocaleData(localeDe);

@NgModule({
    entryComponents: [
        PDocActionTagsComponent,
        PDocReplaceFormComponent,
        PDocAssignFormComponent,
    ],
    imports: [
        AppCommonModule,
        SharedAdminPDocModule,
        PDocAdminModule,
        AppRoutingModule
    ],
    providers: [
        { provide: COMMON_APP_ENVIRONMENT, useValue: environment},
        PDocDynamicComponentService,
        PDocAlbumService,
        {provide: PDocActionTagService, useClass: PDocAdminActionTagService},
        PDocDataCacheService,
        PDocNameSuggesterService,
        PDocDescSuggesterService,
        PDocPageDescSuggesterService,
    ],
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [AppComponent]
})
export class AppModule {}
