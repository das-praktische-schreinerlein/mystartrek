import {AppComponent} from './components/app/app.component';
import {AppService} from './services/app.service';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {SectionsModule} from './sections/sections.module';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {PDocDataStore} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.store';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorPageComponent} from './components/errorpage/errorpage.component';
import {AngularCommonsModule} from '@dps/mycms-frontend-commons/dist/angular-commons/angular-commons.module';
import {PageUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/page.utils';
import {BackendHttpClient} from './services/backend-http-client';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {GenericTrackingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/generic-tracking.service';
import {TrackingService} from './services/tracking.service';
import {Angulartics2Module} from 'angulartics2';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {DynamicComponentService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/dynamic-components.service';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {CookieLawModule} from 'angular2-cookie-law';
import {environment} from '../environments/environment';
import {FallbackHttpClient} from './services/fallback-http-client';
import {NgModule} from '@angular/core';
import {AppCommonRoutingModule} from './app.common.router';
import {StarDocDataStore, StarDocTeamFilterConfig} from '../shared/sdoc-commons/services/sdoc-data.store';
import {StarDocModule} from './sdoc/sdoc.module';
import {StarDocDataService} from '../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocDynamicComponentService} from './shared-sdoc/services/sdoc-dynamic-components.service';
import {StarDocAlbumService} from './shared-sdoc/services/sdoc-album.service';
import {StarDocDataCacheService} from './shared-sdoc/services/sdoc-datacache.service';
import {StarDocActionTagService} from './shared-sdoc/services/sdoc-actiontag.service';
import {StarDocPlaylistService} from './shared-sdoc/services/sdoc-playlist.service';
import {StarDocActionTagsComponent} from './shared-sdoc/components/sdoc-actiontags/sdoc-actiontags.component';

registerLocaleData(localeDe);

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient, platformService: PlatformService): TranslateHttpLoader {
    const url = platformService.getAssetsUrl('./assets/locales/locale-');
    // console.log('use translate-baseul', url);
    return new TranslateHttpLoader(http, url,  environment.assetsPathVersionSnippet + '.json' + environment.assetsPathVersionSuffix);
}

export function getAngulartics2Providers(): any {
    return TrackingService.getTrackingProvider();
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ErrorPageComponent
    ],
    entryComponents: [
        StarDocActionTagsComponent
    ],
    imports: [
        HttpClientModule,
        NgbCollapseModule, NgbDropdownModule,
        BrowserModule.withServerTransition({appId: 'sdoc-app'}),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient, PlatformService]
            }
        }),
        Angulartics2Module.forRoot(getAngulartics2Providers()),
        AngularCommonsModule,
        StarDocModule,
        SectionsModule,
        CookieLawModule,
        AppCommonRoutingModule
    ],
    providers: [
        {provide: MinimalHttpBackendClient, useClass: BackendHttpClient},
        // customUrlSerializerProvider, // activate this to get parenthes in parameters running, but then suburls dont run anymore
        CommonRoutingService,
        {provide: GenericAppService, useClass: AppService},
        FallbackHttpClient,
        DynamicComponentService,
        StarDocDynamicComponentService,
        StarDocTeamFilterConfig,
        StarDocDataStore,
        StarDocDataService,
        PDocDataStore,
        StarDocAlbumService,
        PDocDataService,
        StarDocDataCacheService,
        SearchFormUtils,
        {provide: GenericTrackingService, useClass: TrackingService},
        AngularHtmlService,
        {provide: SearchParameterUtils, useClass: SearchParameterUtils},
        PageUtils,
        {provide: PlatformService, useClass: PlatformService},
        LayoutService,
        StarDocActionTagService,
        StarDocPlaylistService
    ],
    bootstrap: [AppComponent]
})
export class AppCommonModule {}
