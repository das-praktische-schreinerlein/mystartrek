import {StarDocSearchResult} from '../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchForm, StarDocSearchFormValidator} from '../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocDataService} from '../shared/sdoc-commons/services/sdoc-data.service';
import express from 'express';
import {StarDocRecord} from '../shared/sdoc-commons/model/records/sdoc-record';
import {DataCacheModule} from '@dps/mycms-server-commons/dist/server-commons/datacache.module';
import {CommonDocServerModule} from '@dps/mycms-server-commons/dist/backend-commons/modules/cdoc-server.module';
import {CommonDocSearchForm} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';

export class StarDocServerModule extends CommonDocServerModule<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {
    public static configureRoutes(app: express.Application, apiPrefix: string, dataService: StarDocDataService,
                                  cache: DataCacheModule, backendConfig: {}): StarDocServerModule {
        const sdocServerModule = new StarDocServerModule(dataService, cache);
        CommonDocServerModule.configureServerRoutes(app, apiPrefix, sdocServerModule, cache, backendConfig);
        return sdocServerModule;
    }

    public constructor(protected dataService: StarDocDataService, protected cache: DataCacheModule) {
        super(dataService, cache);
    }

    getApiId(): string {
        return 'sdoc';
    }

    getApiResolveParameterName(): string {
        return 'resolveTdocByTdocId';
    }

    isSearchFormValid(searchForm: CommonDocSearchForm): boolean {
        return StarDocSearchFormValidator.isValid(<StarDocSearchForm>searchForm);
    }

}
