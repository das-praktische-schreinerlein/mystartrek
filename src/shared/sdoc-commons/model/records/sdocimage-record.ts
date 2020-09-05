import {
    BaseImageRecord,
    BaseImageRecordFactory,
    BaseImageRecordValidator
} from '@dps/mycms-commons/dist/search-commons/model/records/baseimage-record';
import {BaseEntityRecordRelationsType} from "@dps/mycms-commons/dist/search-commons/model/records/base-entity-record";

export class StarDocImageRecord extends BaseImageRecord {
    sdoc_id: string;

    getMediaId(): string {
        return this.sdoc_id;
    }

    toString() {
        return 'StarDocImageRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  fileName: ' + this.fileName + '\n' +
            '  name: ' + this.name + ',\n' +
            '  sdoc_id: ' + this.sdoc_id + '' +
            '}';
    }
}

export class StarDocImageRecordFactory extends BaseImageRecordFactory {
    public static instance = new StarDocImageRecordFactory();

    static createSanitized(values: {}): StarDocImageRecord {
        const sanitizedValues = StarDocImageRecordFactory.instance.getSanitizedValues(values, {});
        return new StarDocImageRecord(sanitizedValues);
    }

    static cloneSanitized(doc: StarDocImageRecord): StarDocImageRecord {
        const sanitizedValues = StarDocImageRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new StarDocImageRecord(sanitizedValues);
    }
}

export class StarDocImageRecordValidator extends BaseImageRecordValidator {
    public static instance = new StarDocImageRecordValidator();
}

export let StarDocImageRecordRelation: BaseEntityRecordRelationsType = {
    belongsTo: {
        sdoc: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related object in memory
            localField: 'sdoc',
            mapperKey: 'sdoc'
        }
    }
};
