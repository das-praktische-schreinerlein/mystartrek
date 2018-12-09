import {
    BaseEntityRecord,
    BaseEntityRecordFieldConfig,
    BaseEntityRecordType
} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';
import {GenericValidatorDatatypes, NumberValidationRule} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';

export interface BaseDataTechRecordType extends BaseEntityRecordType {
    dur: number;
}

export class BaseDataTechRecord extends BaseEntityRecord implements BaseDataTechRecordType {
    static datatechFields = {
        dur: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NUMBER,
            new NumberValidationRule(false, 0, 999999, undefined))
    };

    dur: number;

    toString() {
        return 'BaseDataTechRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  dur: ' + this.dur + ',\n' +
            '}';
    }
}
