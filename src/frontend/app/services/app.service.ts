import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppState, GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {MinimalHttpBackendClient} from '@dps/mycms-commons/dist/commons/services/minimal-http-backend-client';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {BaseEntityRecord} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';

@Injectable()
export class AppService extends GenericAppService {
    private appConfig = {
        backendApiBaseUrl: environment.backendApiBaseUrl,
        permissions: {
        },
        components: {},
        services: {}
    };

    constructor(private pdocDataService: PDocDataService, @Inject(LOCALE_ID) private locale: string,
                private http: HttpClient, private commonRoutingService: CommonRoutingService,
                private backendHttpClient: MinimalHttpBackendClient, private platformService: PlatformService) {
        super();
    }

    initApp(): void {
        const me = this;
        this.initAppConfig().then(function onConfigLoaded() {
            return me.initBackendData();
        }).then(function onBackendLoaded() {
            console.log('app ready');
            me.setAppState(AppState.Ready);
        }).catch(function onError(reason: any) {
            console.error('loading app failed:', reason);
            me.setAppState(AppState.Failed);
        });
    }

    getAppConfig(): {}  {
        return this.appConfig;
    }

    doSwitchToOfflineVersion(): void {
    }

    doSwitchToOnlineVersion(): void {
        const me = this;
        this.initBackendData().then(function onFullfiled() {
            me.commonRoutingService.navigateByUrl('/');
        }).catch(function onError(reason: any) {
            console.error('loading app failed:', reason);
            me.setAppState(AppState.Failed);
        });
    }

    initAppConfig(): Promise<any> {
        const me = this;
        return new Promise<boolean>((resolve, reject) => {
            const url = me.platformService.getAssetsUrl(
                `./assets/config` + environment.assetsPathVersionSnippet + `.json` + environment.assetsPathVersionSuffix);
            // console.log('load config:', url);
            me.http.get(url).toPromise()
                .then(function onConfigLoaded(res: any) {
                    const config: {} = res;
                    // console.log('initially loaded config from assets', config);
                    me.appConfig.components = config['components'];
                    me.appConfig.services = config['services'];
                    return resolve(true);
                }).catch(function onError(reason: any) {
                    console.error('loading appdata failed:', reason);
                    return reject(false);
            });
        });
    }

    initBackendData(): Promise<boolean> {
        const me = this;
        const options = {
            basePath: this.appConfig.backendApiBaseUrl + this.locale + '/',
            http: function (httpConfig) {
                return me.backendHttpClient.makeHttpRequest(httpConfig);
            }
        };
        this.pdocDataService.clearLocalStore();

        return new Promise<boolean>((resolve, reject) => {
            me.backendHttpClient.makeHttpRequest({ method: 'get', url: options.basePath + 'pdoc/', withCredentials: true })
                .then(function onDocsLoaded(res: any) {
                    const docs: any[] = (res['data'] || res.json());
                    me.pdocDataService.setWritable(true);
                    return me.pdocDataService.addMany(docs);
                }).then(function onDocsAdded(records: BaseEntityRecord[]) {
                    // console.log('initially loaded pdocs from server', records);
                    me.pdocDataService.setWritable(false);
                    return resolve(true);
                }).catch(function onError(reason: any) {
                    console.error('loading appdata failed:', reason);
                    me.pdocDataService.setWritable(false);
                    return reject(false);
                });
            });
    }

}
