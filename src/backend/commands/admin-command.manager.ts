import {
    CommonAdminCommandConfigType,
    CommonAdminCommandManager
} from '@dps/mycms-server-commons/dist/backend-commons/commands/common-admin-command.manager';
import {ExtendedConfigInitializerCommand} from './extendedconfig-initializer.command';
import {StarDocConverterCommand} from './sdoc-converter.command';
import {StarDocLoaderCommand} from './sdoc-loader.command';
import {StarDocExporterCommand} from './sdoc-exporter.command';
import {MediaManagerCommand} from './media-manager.command';
import {DbMigrateCommand} from '@dps/mycms-server-commons/dist/backend-commons/commands/dbmigrate.command';
import {PageManagerCommand} from '@dps/mycms-server-commons/dist/pdoc-backend-commons/commands/pdoc-manager.command';
import {PDocLoaderCommand} from '@dps/mycms-server-commons/dist/pdoc-backend-commons/commands/pdoc-loader.command';
import {SiteMapGeneratorCommand} from './sitemap-generator.command';
import {PDocConverterCommand} from '@dps/mycms-server-commons/dist/pdoc-backend-commons/commands/pdoc-converter.command';
import {PDocPdfManagerCommand} from '@dps/mycms-server-commons/dist/pdoc-backend-commons/commands/pdoc-pdf-manager.command';

// tslint:disable-next-line:no-empty-interface
export interface AdminCommandConfigType extends CommonAdminCommandConfigType {
}

export class AdminCommandManager extends CommonAdminCommandManager<AdminCommandConfigType> {
    constructor(adminCommandConfig: AdminCommandConfigType) {
        super({
            'convertPDoc': new PDocConverterCommand(),
            'convertStarDoc': new StarDocConverterCommand(),
            'dbMigrate': new DbMigrateCommand(),
            'exportStarDoc': new StarDocExporterCommand(),
            'generateSitemap': new SiteMapGeneratorCommand(),
            'initConfig': new ExtendedConfigInitializerCommand(),
            'loadPDoc': new PDocLoaderCommand(),
            'loadStarDoc': new StarDocLoaderCommand(),
            'mediaManager': new MediaManagerCommand(),
            'pdocPdfManager': new PDocPdfManagerCommand(),
            'pageManager': new PageManagerCommand()
        }, adminCommandConfig);
    }

}

