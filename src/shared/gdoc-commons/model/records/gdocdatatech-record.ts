import {BaseDataTechRecord} from './basedatatech-record';
import {BaseEntityRecordFactory, BaseEntityRecordValidator} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';

export class GeoDocDataTechRecord extends BaseDataTechRecord {
    gdoc_id: string;

    toString() {
        return 'GeoDocDataTechRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  altAsc: ' + this.altAsc + ',\n' +
            '  altDesc: ' + this.altDesc + ',\n' +
            '  altMax: ' + this.altMax + ',\n' +
            '  altMin: ' + this.altMin + ',\n' +
            '  dist: ' + this.dist + ',\n' +
            '  dur: ' + this.dur + ',\n' +
            '  gdoc_id: ' + this.gdoc_id + '' +
            '}';
    }
}

export class GeoDocDataTechRecordFactory extends BaseEntityRecordFactory {
    public static instance = new GeoDocDataTechRecordFactory();

    static createSanitized(values: {}): GeoDocDataTechRecord {
        const sanitizedValues = GeoDocDataTechRecordFactory.instance.getSanitizedValues(values, {});
        return new GeoDocDataTechRecord(sanitizedValues);
    }

    static cloneSanitized(doc: GeoDocDataTechRecord): GeoDocDataTechRecord {
        const sanitizedValues = GeoDocDataTechRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new GeoDocDataTechRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, GeoDocDataTechRecord.datatechFields, result, '');
        return result;
    }
}

export class GeoDocDataTechRecordValidator extends BaseEntityRecordValidator {
    public static instance = new GeoDocDataTechRecordValidator();

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);

        return this.validateFieldRules(values, GeoDocDataTechRecord.datatechFields, fieldPrefix, errors, errFieldPrefix) && state;
    }
}

export let GeoDocDataTechRecordRelation: any = {
    belongsTo: {
        gdoc: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related object in memory
            localField: 'gdoc'
        }
    }
};
