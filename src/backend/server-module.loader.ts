import {ConfigureServerModule} from '@dps/mycms-server-commons/dist/server-commons/configure-server.module';
import {PDocServerModule} from './modules/pdoc-server.module';
import {FirewallConfig} from '@dps/mycms-server-commons/dist/server-commons/firewall.commons';
import {DnsBLModule} from '@dps/mycms-server-commons/dist/server-commons/dnsbl.module';
import {FirewallModule} from '@dps/mycms-server-commons/dist/server-commons/firewall.module';
import {PDocDataService} from '@dps/mycms-commons/dist/pdoc-commons/services/pdoc-data.service';
import {PDocDataServiceModule} from './modules/pdoc-dataservice.module';
import {DataCacheModule} from '@dps/mycms-server-commons/dist/server-commons/datacache.module';
import {CommonServerConfigType} from '@dps/mycms-server-commons/dist/server-commons/server.commons';
import {BackendConfigType} from './modules/backend.commons';
import {StarDocDataServiceModule} from "./modules/sdoc-dataservice.module";
import {StarDocDataService} from "shared/sdoc-commons/services/sdoc-data.service";
import {StarDocServerModule} from "./modules/sdoc-server.module";

export interface ServerConfig extends CommonServerConfigType<BackendConfigType, FirewallConfig> {
}

export class ServerModuleLoader {
    public static loadModules(app, serverConfig: ServerConfig) {

        ConfigureServerModule.configureServer(app, serverConfig.backendConfig);
        ConfigureServerModule.configureServerAddHysteric(app, serverConfig.backendConfig);
        FirewallModule.configureFirewall(app, serverConfig.firewallConfig, serverConfig.filePathErrorDocs);
        DnsBLModule.configureDnsBL(app, serverConfig.firewallConfig, serverConfig.filePathErrorDocs);

        // configure dataservices
        const sdocDataService: StarDocDataService = StarDocDataServiceModule.getDataService('sdocSolr',
            serverConfig.backendConfig);
        const pdocDataServiceDE: PDocDataService = PDocDataServiceModule.getDataService('pdocSolrDE',
            serverConfig.backendConfig, 'de');
        const pdocDataServiceEN: PDocDataService = PDocDataServiceModule.getDataService('pdocSolrEN',
            serverConfig.backendConfig, 'en');
        const cache: DataCacheModule = new DataCacheModule(serverConfig.backendConfig.cacheConfig);

        // add routes
        const sdocServerModule = StarDocServerModule.configureRoutes(app, serverConfig.apiDataPrefix, sdocDataService, cache,
            serverConfig.backendConfig);
        PDocServerModule.configureRoutes(app, serverConfig.apiDataPrefix, pdocDataServiceDE, 'de');
        PDocServerModule.configureRoutes(app, serverConfig.apiDataPrefix, pdocDataServiceEN, 'en');

        ConfigureServerModule.configureDefaultErrorHandler(app);
    }
}
