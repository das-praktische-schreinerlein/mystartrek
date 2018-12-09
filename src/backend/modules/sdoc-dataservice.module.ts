import {StarDocDataStore, StarDocTeamFilterConfig} from '../shared/sdoc-commons/services/sdoc-data.store';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';
import {StarDocDataService} from '../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocSolrAdapter} from '../shared/sdoc-commons/services/sdoc-solr.adapter';
import axios from 'axios';
import * as fs from 'fs';
import {HttpAdapter} from 'js-data-http';
import {StarDocItemsJsAdapter} from '../shared/sdoc-commons/services/sdoc-itemsjs.adapter';
import {StarDocFileUtils} from '../shared/sdoc-commons/services/sdoc-file.utils';

export class StarDocDataServiceModule {
    private static dataServices = new Map<string, StarDocDataService>();

    public static getDataService(profile: string, backendConfig: {}): StarDocDataService {
        if (!this.dataServices.has(profile)) {
            switch (backendConfig['sdocDataStoreAdapter']) {
                case 'StarDocSolrAdapter':
                    this.dataServices.set(profile, StarDocDataServiceModule.createDataServiceSolr(backendConfig));
                    break;
                case 'StarDocItemsJsAdapter':
                    this.dataServices.set(profile, StarDocDataServiceModule.createDataServiceItemsJs(backendConfig));
                    break;
                default:
                    throw new Error('configured sdocDataStoreAdapter not exist:' + backendConfig['sdocDataStoreAdapter']);
            }
        }

        return this.dataServices.get(profile);
    }

    private static createDataServiceSolr(backendConfig: {}): StarDocDataService {
        // configure store
        const filterConfig: StarDocTeamFilterConfig = new StarDocTeamFilterConfig();
        const themeFilters: any[] = JSON.parse(fs.readFileSync(backendConfig['filePathThemeFilterJson'], { encoding: 'utf8' }));
        for (const themeName in themeFilters) {
            filterConfig.set(themeName, themeFilters[themeName]);
        }
        const dataStore: StarDocDataStore = new StarDocDataStore(new SearchParameterUtils(), filterConfig);
        const dataService: StarDocDataService = new StarDocDataService(dataStore);

        // configure solr-adapter
        const solrConfig = backendConfig['StarDocSolrAdapter'];
        if (solrConfig === undefined) {
            throw new Error('config for StarDocSolrAdapter not exists');
        }
        const options = {
            basePath: solrConfig['solrCoreStarDoc'],
            suffix: '&wt=json&indent=on&datatype=jsonp&json.wrf=JSONP_CALLBACK&callback=JSONP_CALLBACK&',
            http: axios,
            beforeHTTP: function (config, opts) {
                config.auth = {
                    username: solrConfig['solrCoreStarDocReadUsername'],
                    password: solrConfig['solrCoreStarDocReadPassword']
                };

                // Now do the default behavior
                return HttpAdapter.prototype.beforeHTTP.call(this, config, opts);
            },
            mapperConfig: backendConfig['mapperConfig']
        };
        const adapter = new StarDocSolrAdapter(options);
        dataStore.setAdapter('http', adapter, '', {});

        return dataService;
    }

    private static createDataServiceItemsJs(backendConfig: {}): StarDocDataService {
        // configure store
        const filterConfig: StarDocTeamFilterConfig = new StarDocTeamFilterConfig();
        const themeFilters: any[] = JSON.parse(fs.readFileSync(backendConfig['filePathThemeFilterJson'], { encoding: 'utf8' }));
        for (const themeName in themeFilters) {
            filterConfig.set(themeName, themeFilters[themeName]);
        }
        const dataStore: StarDocDataStore = new StarDocDataStore(new SearchParameterUtils(), filterConfig);
        const dataService: StarDocDataService = new StarDocDataService(dataStore);

        // configure adapter
        const itemsJsConfig = backendConfig['StarDocItemsJsAdapter'];
        if (itemsJsConfig === undefined) {
            throw new Error('config for StarDocItemsJsAdapter not exists');
        }
        const records = StarDocFileUtils.parseRecordSourceFromJson(fs.readFileSync(itemsJsConfig['dataFile'], { encoding: 'utf8' }));

        const adapter = new StarDocItemsJsAdapter({mapperConfig: backendConfig['mapperConfig']}, records);
        dataStore.setAdapter('http', adapter, '', {});

        return dataService;
    }
}
