import {BaseDataInfoRecord} from './basedatainfo-record';
import {BaseEntityRecordFactory, BaseEntityRecordValidator} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';

export class StarDocDataInfoRecord extends BaseDataInfoRecord {
    sdoc_id: string;

    toString() {
        return 'StarDocDataInfoRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  guides: ' + this.guides + ',\n' +
            '  sdoc_id: ' + this.sdoc_id + '' +
            '}';
    }
}

export class StarDocDataInfoRecordFactory extends BaseEntityRecordFactory {
    public static instance = new StarDocDataInfoRecordFactory();

    static createSanitized(values: {}): StarDocDataInfoRecord {
        const sanitizedValues = StarDocDataInfoRecordFactory.instance.getSanitizedValues(values, {});
        return new StarDocDataInfoRecord(sanitizedValues);
    }

    static cloneSanitized(doc: StarDocDataInfoRecord): StarDocDataInfoRecord {
        const sanitizedValues = StarDocDataInfoRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new StarDocDataInfoRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, StarDocDataInfoRecord.datainfoFields, result, '');
        return result;
    }
}

export class StarDocDataInfoRecordValidator extends BaseEntityRecordValidator {
    public static instance = new StarDocDataInfoRecordValidator();

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);

        return this.validateFieldRules(values, StarDocDataInfoRecord.datainfoFields, fieldPrefix, errors, errFieldPrefix) && state;
    }
}

export let StarDocDataInfoRecordRelation: any = {
    belongsTo: {
        sdoc: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related object in memory
            localField: 'sdoc'
        }
    }
};
