import {
    BaseEntityRecord,
    BaseEntityRecordFieldConfig,
    BaseEntityRecordType
} from '@dps/mycms-commons/dist/search-commons/model/records/base-entity-record';
import {GenericValidatorDatatypes, NameValidationRule} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';

export interface BaseDataInfoRecordType extends BaseEntityRecordType {
    guides: string;
}

export class BaseDataInfoRecord extends BaseEntityRecord implements BaseDataInfoRecordType {
    static datainfoFields = {
        guides: new BaseEntityRecordFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
    };

    guides: string;

    toString() {
        return 'BaseDataTechRecord Record {\n' +
            '  id: ' + this.id + ',\n' +
            '  guides: ' + this.guides + ',\n' +
            '}';
    }
}
