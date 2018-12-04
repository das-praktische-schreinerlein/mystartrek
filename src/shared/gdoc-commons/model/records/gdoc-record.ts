import {
    BaseEntityRecord,
    BaseEntityRecordFieldConfig,
    BaseEntityRecordType
} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';
import {
    DateValidationRule,
    DbIdValidationRule,
    FilenameValidationRule,
    GenericValidatorDatatypes,
    GeoLocValidationRule,
    GpsTrackValidationRule,
    HierarchyValidationRule,
    IdCsvValidationRule,
    NumberValidationRule,
    StringNumberValidationRule,
    TextValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {isArray} from 'util';
import {
    CommonDocRecord,
    CommonDocRecordFactory,
    CommonDocRecordValidator
} from '@dps/mycms-commons/dist/search-commons/model/records/cdoc-entity-record';
import {GeoDocDataTechRecord, GeoDocDataTechRecordFactory, GeoDocDataTechRecordValidator} from './gdocdatatech-record';
import {GeoDocDataInfoRecord, GeoDocDataInfoRecordFactory, GeoDocDataInfoRecordValidator} from './gdocdatainfo-record';
import {GeoDocImageRecord, GeoDocImageRecordFactory, GeoDocImageRecordValidator} from './gdocimage-record';

export interface GeoDocRecordType extends BaseEntityRecordType {
    locId: number;
    locIdParent: number;
    imageId: number;

    geoDistance: number;
    geoLon: string;
    geoLat: string;
    geoEle: string;
    geoLoc: string;
    gpsTrackSrc: string;
    gpsTrackBasefile: string;
    locHirarchie: string;
    locHirarchieIds: string;
}

export class GeoDocRecord extends CommonDocRecord implements GeoDocRecordType {
    static gdocRelationNames = ['gdocdatatech', 'gdocdatainfo', 'gdocimages'];
    static gdocValidationRelationNames = ['gdocdatatech', 'gdocdatainfo'];
    static gdocFields = {
        locId: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.ID, new DbIdValidationRule(false)),
        locIdParent: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.ID, new DbIdValidationRule(false)),
        imageId: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.ID, new DbIdValidationRule(false)),

        geoDistance: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NUMBER,
            new NumberValidationRule(false, -99999, 999999, undefined)),
        geoLon: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NUMBER,
            new StringNumberValidationRule(false, -99999, 999999, undefined)),
        geoLat: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NUMBER,
            new StringNumberValidationRule(false, -99999, 999999, undefined)),
        geoEle: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NUMBER,
            new StringNumberValidationRule(false, -99999, 999999, undefined)),
        geoLoc: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.GEOLOC, new GeoLocValidationRule(false)),
        gpsTrackBasefile: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.FILENAME, new FilenameValidationRule(false)),
        gpsTrackSrc: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.GPSTRACK, new GpsTrackValidationRule(false)),

        locHirarchie: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.TEXT, new HierarchyValidationRule(false)),
        locHirarchieIds: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.ID_CSV, new IdCsvValidationRule(false))
    };

    locId: number;
    locIdParent: number;
    imageId: number;

    geoDistance: number;
    geoLon: string;
    geoLat: string;
    geoEle: string;
    geoLoc: string;
    gpsTrackSrc: string;
    gpsTrackBasefile: string;
    locHirarchie: string;
    locHirarchieIds: string;

    static cloneToSerializeToJsonObj(baseRecord: GeoDocRecord, anonymizeMedia?: boolean): {}  {
        const record  = {};
        for (const key in baseRecord) {
            record[key] = baseRecord[key];
        }
        for (const relationName of GeoDocRecord.gdocRelationNames) {
            record[relationName] = baseRecord.get(relationName);
        }

        if (anonymizeMedia === true) {
            let relationName = 'gdocimages';
            if (isArray(record[relationName])) {
                for (const media of record[relationName]) {
                    media.fileName = 'anonymized.JPG';
                }
            }
        }

        return record;
    }

    toString() {
        return 'GeoDocRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  name: ' + this.name + ',\n' +
            '  type: ' + this.type + '' +
            '}';
    }

    toSerializableJsonObj(anonymizeMedia?: boolean): {} {
        return GeoDocRecord.cloneToSerializeToJsonObj(this, anonymizeMedia);
    }

    isValid(): boolean {
        return GeoDocRecordValidator.instance.isValid(this);
    }
}

export let GeoDocRecordRelation: any = {
    hasOne: {
        gdocdatatech: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related objects in memory
            localField: 'gdocdatatech'
        },
        gdocdatainfo: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related objects in memory
            localField: 'gdocdatainfo'
        }
    },
    hasMany: {
        gdocimage: {
            // database column
            foreignKey: 'gdoc_id',
            // reference to related objects in memory
            localField: 'gdocimages'
        }
    }
};

export class GeoDocRecordFactory extends CommonDocRecordFactory {
    public static instance = new GeoDocRecordFactory();

    static createSanitized(values: {}): GeoDocRecord {
        const sanitizedValues = GeoDocRecordFactory.instance.getSanitizedValues(values, {});
        return new GeoDocRecord(sanitizedValues);
    }

    static cloneSanitized(doc: GeoDocRecord): GeoDocRecord {
        const sanitizedValues = GeoDocRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new GeoDocRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, GeoDocRecord.gdocFields, result, '');
        return result;
    }

    getSanitizedRelationValues(relation: string, values: {}): {} {
        switch (relation) {
            case 'gdocdatatech':
                return GeoDocDataTechRecordFactory.instance.getSanitizedValues(values, {});
            case 'gdocdatainfo':
                return GeoDocDataInfoRecordFactory.instance.getSanitizedValues(values, {});
            case 'gdocimages':
                return GeoDocImageRecordFactory.instance.getSanitizedValues(values, {});
            default:
                return super.getSanitizedRelationValues(relation, values);
        }
    };

}

export class GeoDocRecordValidator extends CommonDocRecordValidator {
    public static instance = new GeoDocRecordValidator();

    isValid(doc: BaseEntityRecord, errFieldPrefix?: string): boolean {
        console.warn('GeoDocRecordValidator: validation-errors', this.validate(doc, errFieldPrefix));
        // TODO: validate subtype requitred for TRACK, ROUTE, LOCATION
        return this.validate(doc, errFieldPrefix).length === 0;
    }

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);
        return this.validateFieldRules(values, GeoDocRecord.gdocFields, fieldPrefix, errors, errFieldPrefix) && state;
    }

    validateMyValueRelationRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        return this.validateValueRelationRules(values, GeoDocRecord.gdocValidationRelationNames, errors, fieldPrefix, errFieldPrefix);
    }

    validateMyRelationRules(doc: BaseEntityRecord, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        return this.validateRelationRules(doc, GeoDocRecord.gdocRelationNames, errors, fieldPrefix, errFieldPrefix);
    }

    protected validateRelationDoc(relation: string, doc: BaseEntityRecord, errFieldPrefix?: string): string[] {
        switch (relation) {
            case 'gdocdatatech':
                return GeoDocDataTechRecordValidator.instance.validate(<GeoDocDataTechRecord>doc, errFieldPrefix);
            case 'gdocdatainfo':
                return GeoDocDataInfoRecordValidator.instance.validate(<GeoDocDataInfoRecord>doc, errFieldPrefix);
            case 'gdocimages':
                return GeoDocImageRecordValidator.instance.validate(<GeoDocImageRecord>doc, errFieldPrefix);
            default:
                super.validateRelationDoc(relation, doc, errFieldPrefix);
        }
    };

    protected validateValueRelationDoc(relation: string, values: {}, fieldPrefix?: string, errFieldPrefix?: string): string[] {
        switch (relation) {
            case 'gdocdatatech':
                return GeoDocDataTechRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            case 'gdocdatainfo':
                return GeoDocDataInfoRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            case 'gdocimages':
                return GeoDocImageRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            default:
                super.validateValueRelationDoc(relation, values, fieldPrefix, errFieldPrefix);
        }
    };
}
