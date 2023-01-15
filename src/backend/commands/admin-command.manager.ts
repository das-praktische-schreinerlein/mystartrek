import {SiteMapGeneratorCommand} from './sitemap-generator.command';
import {
    CommonAdminCommandConfigType,
    CommonAdminCommandManager
} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin-command.manager';
import {ExtendedConfigInitializerCommand} from './extendedconfig-initializer.command';
import {StarDocConverterCommand} from './sdoc-converter.command';
import {StarDocLoaderCommand} from './sdoc-loader.command';
import {StarDocExporterCommand} from './sdoc-exporter.command';
import {MediaManagerCommand} from './media-manager.command';

export interface AdminCommandConfigType extends CommonAdminCommandConfigType {
}

export class AdminCommandManager extends CommonAdminCommandManager<AdminCommandConfigType> {
    constructor(adminCommandConfig: AdminCommandConfigType) {
        super({
            'initConfig': new ExtendedConfigInitializerCommand(),
            'convertStarDoc': new StarDocConverterCommand(),
            'loadStarDoc': new StarDocLoaderCommand(),
            'exportStarDoc': new StarDocExporterCommand(),
            'mediaManager': new MediaManagerCommand(),
            'generateSitemap': new SiteMapGeneratorCommand()
        }, adminCommandConfig);
    }

}

