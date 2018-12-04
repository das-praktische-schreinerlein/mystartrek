import {BaseDataInfoRecord} from './basedatainfo-record';
import {BaseEntityRecordFactory, BaseEntityRecordValidator} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';

export class GeoDocDataInfoRecord extends BaseDataInfoRecord {
    gdoc_id: string;

    toString() {
        return 'GeoDocDataInfoRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  baseloc: ' + this.baseloc + ',\n' +
            '  destloc: ' + this.destloc + ',\n' +
            '  guides: ' + this.guides + ',\n' +
            '  region: ' + this.region + ',\n' +
            '  gdoc_id: ' + this.gdoc_id + '' +
            '}';
    }
}

export class GeoDocDataInfoRecordFactory extends BaseEntityRecordFactory {
    public static instance = new GeoDocDataInfoRecordFactory();

    static createSanitized(values: {}): GeoDocDataInfoRecord {
        const sanitizedValues = GeoDocDataInfoRecordFactory.instance.getSanitizedValues(values, {});
        return new GeoDocDataInfoRecord(sanitizedValues);
    }

    static cloneSanitized(doc: GeoDocDataInfoRecord): GeoDocDataInfoRecord {
        const sanitizedValues = GeoDocDataInfoRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new GeoDocDataInfoRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, GeoDocDataInfoRecord.datainfoFields, result, '');
        return result;
    }
}

export class GeoDocDataInfoRecordValidator extends BaseEntityRecordValidator {
    public static instance = new GeoDocDataInfoRecordValidator();

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);

        return this.validateFieldRules(values, GeoDocDataInfoRecord.datainfoFields, fieldPrefix, errors, errFieldPrefix) && state;
    }
}

export let GeoDocDataInfoRecordRelation: any = {
    belongsTo: {
        gdoc: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related object in memory
            localField: 'gdoc'
        }
    }
};
