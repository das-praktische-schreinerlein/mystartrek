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
    IdCsvValidationRule, NameValidationRule,
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
import {StarDocDataTechRecord, StarDocDataTechRecordFactory, StarDocDataTechRecordValidator} from './sdocdatatech-record';
import {StarDocDataInfoRecord, StarDocDataInfoRecordFactory, StarDocDataInfoRecordValidator} from './sdocdatainfo-record';
import {StarDocImageRecord, StarDocImageRecordFactory, StarDocImageRecordValidator} from './sdocimage-record';

export interface StarDocRecordType extends BaseEntityRecordType {
    locId: number;
    locIdParent: number;
    imageId: number;

    geoDistance: number;
    geoLon: string;
    geoLat: string;
    geoEle: string;
    geoLoc: string;
    magnitude: string;
    designator: string;
    bvcoloridx: string;
    dimension: string;
}

export class StarDocRecord extends CommonDocRecord implements StarDocRecordType {
    static sdocRelationNames = ['sdocdatatech', 'sdocdatainfo', 'sdocimages'];
    static sdocValidationRelationNames = ['sdocdatatech', 'sdocdatainfo'];
    static sdocFields = {
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
        designator: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        magnitude: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),

        bvcoloridx: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        dimension: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false))
    };

    locId: number;
    locIdParent: number;
    imageId: number;

    geoDistance: number;
    geoLon: string;
    geoLat: string;
    geoEle: string;
    geoLoc: string;
    magnitude: string;
    designator: string;
    bvcoloridx: string;
    dimension: string;

    static cloneToSerializeToJsonObj(baseRecord: StarDocRecord, anonymizeMedia?: boolean): {}  {
        const record  = {};
        for (const key in baseRecord) {
            record[key] = baseRecord[key];
        }
        for (const relationName of StarDocRecord.sdocRelationNames) {
            record[relationName] = baseRecord.get(relationName);
        }

        if (anonymizeMedia === true) {
            let relationName = 'sdocimages';
            if (isArray(record[relationName])) {
                for (const media of record[relationName]) {
                    media.fileName = 'anonymized.JPG';
                }
            }
        }

        return record;
    }

    toString() {
        return 'StarDocRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  name: ' + this.name + ',\n' +
            '  type: ' + this.type + '' +
            '}';
    }

    toSerializableJsonObj(anonymizeMedia?: boolean): {} {
        return StarDocRecord.cloneToSerializeToJsonObj(this, anonymizeMedia);
    }

    isValid(): boolean {
        return StarDocRecordValidator.instance.isValid(this);
    }
}

export let StarDocRecordRelation: any = {
    hasOne: {
        sdocdatatech: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related objects in memory
            localField: 'sdocdatatech'
        },
        sdocdatainfo: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related objects in memory
            localField: 'sdocdatainfo'
        }
    },
    hasMany: {
        sdocimage: {
            // database column
            foreignKey: 'sdoc_id',
            // reference to related objects in memory
            localField: 'sdocimages'
        }
    }
};

export class StarDocRecordFactory extends CommonDocRecordFactory {
    public static instance = new StarDocRecordFactory();

    static createSanitized(values: {}): StarDocRecord {
        const sanitizedValues = StarDocRecordFactory.instance.getSanitizedValues(values, {});
        return new StarDocRecord(sanitizedValues);
    }

    static cloneSanitized(doc: StarDocRecord): StarDocRecord {
        const sanitizedValues = StarDocRecordFactory.instance.getSanitizedValuesFromObj(doc);
        return new StarDocRecord(sanitizedValues);
    }

    getSanitizedValues(values: {}, result: {}): {} {
        super.getSanitizedValues(values, result);
        this.sanitizeFieldValues(values, StarDocRecord.sdocFields, result, '');
        return result;
    }

    getSanitizedRelationValues(relation: string, values: {}): {} {
        switch (relation) {
            case 'sdocdatatech':
                return StarDocDataTechRecordFactory.instance.getSanitizedValues(values, {});
            case 'sdocdatainfo':
                return StarDocDataInfoRecordFactory.instance.getSanitizedValues(values, {});
            case 'sdocimages':
                return StarDocImageRecordFactory.instance.getSanitizedValues(values, {});
            default:
                return super.getSanitizedRelationValues(relation, values);
        }
    };

}

export class StarDocRecordValidator extends CommonDocRecordValidator {
    public static instance = new StarDocRecordValidator();

    isValid(doc: BaseEntityRecord, errFieldPrefix?: string): boolean {
        console.warn('StarDocRecordValidator: validation-errors', this.validate(doc, errFieldPrefix));
        // TODO: validate subtype requitred for TRACK, ROUTE, LOCATION
        return this.validate(doc, errFieldPrefix).length === 0;
    }

    validateMyFieldRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        fieldPrefix = fieldPrefix !== undefined ? fieldPrefix : '';
        errFieldPrefix = errFieldPrefix !== undefined ? errFieldPrefix : '';

        const state = super.validateMyFieldRules(values, errors, fieldPrefix, errFieldPrefix);
        return this.validateFieldRules(values, StarDocRecord.sdocFields, fieldPrefix, errors, errFieldPrefix) && state;
    }

    validateMyValueRelationRules(values: {}, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        return this.validateValueRelationRules(values, StarDocRecord.sdocValidationRelationNames, errors, fieldPrefix, errFieldPrefix);
    }

    validateMyRelationRules(doc: BaseEntityRecord, errors: string[], fieldPrefix?: string, errFieldPrefix?: string): boolean {
        return this.validateRelationRules(doc, StarDocRecord.sdocRelationNames, errors, fieldPrefix, errFieldPrefix);
    }

    protected validateRelationDoc(relation: string, doc: BaseEntityRecord, errFieldPrefix?: string): string[] {
        switch (relation) {
            case 'sdocdatatech':
                return StarDocDataTechRecordValidator.instance.validate(<StarDocDataTechRecord>doc, errFieldPrefix);
            case 'sdocdatainfo':
                return StarDocDataInfoRecordValidator.instance.validate(<StarDocDataInfoRecord>doc, errFieldPrefix);
            case 'sdocimages':
                return StarDocImageRecordValidator.instance.validate(<StarDocImageRecord>doc, errFieldPrefix);
            default:
                super.validateRelationDoc(relation, doc, errFieldPrefix);
        }
    };

    protected validateValueRelationDoc(relation: string, values: {}, fieldPrefix?: string, errFieldPrefix?: string): string[] {
        switch (relation) {
            case 'sdocdatatech':
                return StarDocDataTechRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            case 'sdocdatainfo':
                return StarDocDataInfoRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            case 'sdocimages':
                return StarDocImageRecordValidator.instance.validateValues(values, fieldPrefix, errFieldPrefix);
            default:
                super.validateValueRelationDoc(relation, values, fieldPrefix, errFieldPrefix);
        }
    };
}
