import {StarDocRecord, StarDocRecordRelation} from '../model/records/sdoc-record';
import {StarDocDataStore} from './sdoc-data.store';
import {StarDocSearchService} from './sdoc-search.service';
import {StarDocImageRecord, StarDocImageRecordRelation} from '../model/records/sdocimage-record';
import {StarDocImageRecordSchema} from '../model/schemas/sdocimage-record-schema';
import {StarDocRecordSchema} from '../model/schemas/sdoc-record-schema';
import {StarDocAdapterResponseMapper} from './sdoc-adapter-response.mapper';
import {ActionTagForm} from '@dps/mycms-commons/dist/commons/utils/actiontag.utils';
import {StarDocSearchForm} from '../model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {CommonDocDataService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-data.service';

export class StarDocDataService extends CommonDocDataService<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    public defaultLocIdParent = 1;

    constructor(dataStore: StarDocDataStore) {
        super(dataStore, new StarDocSearchService(dataStore), new StarDocAdapterResponseMapper({}));
    }

    public createRecord(props, opts): StarDocRecord {
        return <StarDocRecord>this.dataStore.createRecord(this.getBaseMapperName(), props, opts);
    }

    protected addAdditionalActionTagForms(origTdocRecord: StarDocRecord, newTdocRecord: StarDocRecord,
                                          actionTagForms: ActionTagForm[]) {
    }

    protected defineDatastoreMapper(): void {
        this.dataStore.defineMapper('sdoc', StarDocRecord, StarDocRecordSchema, StarDocRecordRelation);
        this.dataStore.defineMapper('sdocimage', StarDocImageRecord, StarDocImageRecordSchema, StarDocImageRecordRelation);
    }

    protected defineIdMappingAlliases(): {} {
        return {
            'locIdParent': 'locId'
        };
    }

    protected defineIdMappings(): string[] {
        return ['locId', 'locIdParent', 'imageId'];
    }

    protected defineTypeMappings(): {} {
        return {
            image: 'imageId',
            location: 'locId'
        };
    }

    protected onImportRecordNewRecordProcessDefaults(record: StarDocRecord): void {
        if (record.type.toLowerCase() === 'location' && record.locIdParent === undefined
            && record.locId !== this.defaultLocIdParent) {
            record.locIdParent = this.defaultLocIdParent;
        }
    }
}
