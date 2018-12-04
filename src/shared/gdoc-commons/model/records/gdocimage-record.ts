import {
    BaseImageRecord,
    BaseImageRecordFactory,
    BaseImageRecordValidator
} from '@dps/mycms-commons/dist/search-commons/model/records/baseimage-record';

export class GeoDocImageRecord extends BaseImageRecord {
    gdoc_id: string;

    getMediaId(): string {
        return this.gdoc_id;
    }

    toString() {
        return 'GeoDocImageRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  fileName: ' + this.fileName + '\n' +
            '  name: ' + this.name + ',\n' +
            '  gdoc_id: ' + this.gdoc_id + '' +
            '}';
    }
}

export class GeoDocImageRecordFactory extends BaseImageRecordFactory {
    public static instance = new GeoDocImageRecordFactory();

    static createSanitized(values: {}): GeoDocImageRecord {
        const sanitizedValues = GeoDocImageRecordFactory.instance.getSanitizedValues(values, {});
        return new GeoDocImageRecord(sanitizedValues);
    }

    static cloneSanitized(doc: GeoDocImageRecord): GeoDocImageRecord {
        const sanitizedValues = GeoDocImageRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new GeoDocImageRecord(sanitizedValues);
    }
}

export class GeoDocImageRecordValidator extends BaseImageRecordValidator {
    public static instance = new GeoDocImageRecordValidator();
}

export let GeoDocImageRecordRelation: any = {
    belongsTo: {
        gdoc: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related object in memory
            localField: 'gdoc'
        }
    }
};
