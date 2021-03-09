import {SiteMapGeneratorCommand} from './sitemap-generator.command';
import {
    CommonAdminCommandConfigType,
    CommonAdminCommandManager
} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin-command.manager';
import {ConfigInitializerCommand} from '@dps/mycms-server-commons/dist/backend-commons/commands/config-initializer.command';
import {StarDocConverterCommand} from './sdoc-converter.command';
import {StarDocLoaderCommand} from './sdoc-loader.command';
import {StarDocExporterCommand} from './sdoc-exporter.command';

export interface AdminCommandConfigType extends CommonAdminCommandConfigType {
}

export class AdminCommandManager extends CommonAdminCommandManager<AdminCommandConfigType> {
    constructor(adminCommandConfig: AdminCommandConfigType) {
        super({
            'initConfig': new ConfigInitializerCommand(),
            'convertStarDoc': new StarDocConverterCommand(),
            'loadStarDoc': new StarDocLoaderCommand(),
            'exportStarDoc': new StarDocExporterCommand(),
            'generateSitemap': new SiteMapGeneratorCommand()
        }, adminCommandConfig);
    }

}

