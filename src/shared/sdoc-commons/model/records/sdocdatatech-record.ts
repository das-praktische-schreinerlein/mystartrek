import {BaseDataTechRecord} from './basedatatech-record';
import {BaseEntityRecordFactory, BaseEntityRecordValidator} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';

export class StarDocDataTechRecord extends BaseDataTechRecord {
    sdoc_id: string;

    toString() {
        return 'StarDocDataTechRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  dur: ' + this.dur + ',\n' +
            '  sdoc_id: ' + this.sdoc_id + '' +
            '}';
    }
}

export class StarDocDataTechRecordFactory extends BaseEntityRecordFactory {
    public static instance = new StarDocDataTechRecordFactory();

    static createSanitized(values: {}): StarDocDataTechRecord {
        const sanitizedValues = StarDocDataTechRecordFactory.instance.getSanitizedValues(values, {});
        return new StarDocDataTechRecord(sanitizedValues);
    }

    static cloneSanitized(doc: StarDocDataTechRecord): StarDocDataTechRecord {
        const sanitizedValues = StarDocDataTechRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new StarDocDataTechRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, StarDocDataTechRecord.datatechFields, result, '');
        return result;
    }
}

export class StarDocDataTechRecordValidator extends BaseEntityRecordValidator {
    public static instance = new StarDocDataTechRecordValidator();

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);

        return this.validateFieldRules(values, StarDocDataTechRecord.datatechFields, fieldPrefix, errors, errFieldPrefix) && state;
    }
}

export let StarDocDataTechRecordRelation: any = {
    belongsTo: {
        sdoc: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related object in memory
            localField: 'sdoc'
        }
    }
};
