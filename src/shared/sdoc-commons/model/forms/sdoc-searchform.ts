import {
    GenericSearchForm,
    GenericSearchFormFieldConfig
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-searchform';
import {
    GenericValidatorDatatypes,
    IdCsvValidationRule,
    KeyParamsValidationRule, NameValidationRule,
    NearbyParamValidationRule,
    TextValidationRule
} from '@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util';
import {
    CommonDocSearchForm,
    CommonDocSearchFormFactory,
    CommonDocSearchFormValidator
} from '@dps/mycms-commons/dist/search-commons/model/forms/cdoc-searchform';
import {NumberValidationRule} from "@dps/mycms-commons/dist/search-commons/model/forms/generic-validator.util";

export class StarDocSearchForm extends CommonDocSearchForm {
    static sdocFields = {
        where: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.LOCATION_KEY_CSV, new KeyParamsValidationRule(false)),
        locId: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.ID_CSV, new IdCsvValidationRule(false)),
        nearby: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NEARBY, new NearbyParamValidationRule(false)),
        nearbyAddress: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.ADDRESS, new TextValidationRule(false)),
        designator: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        magnitude: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        bvcoloridx: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        dimension: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false)),
        subtype: new GenericSearchFormFieldConfig(GenericValidatorDatatypes.NAME, new NameValidationRule(false))
    };

    where: string;
    locId: string;
    nearby: string;
    nearbyAddress: string;
    designator: string;
    magnitude: string;
    bvcoloridx: string;
    dimension: string;
    subtype: string;

    constructor(values: {}) {
        super(values);
        GenericSearchForm.genericFields.perPage = new GenericSearchFormFieldConfig(GenericValidatorDatatypes.PERPAGE, new NumberValidationRule(false, 0, 1000, 100))
        this.where = values['where'] || '';
        this.locId = values['locId'] || '';
        this.nearby = values['nearby'] || '';
        this.nearbyAddress = values['nearbyAddress'] || '';
        this.designator = values['designator'] || '';
        this.magnitude = values['magnitude'] || '';
        this.bvcoloridx = values['bvcoloridx'] || '';
        this.dimension = values['dimension'] || '';
        this.subtype = values['subtype'] || '';
    }

    toString() {
        return 'StarDocSearchForm {\n' +
            '  when: ' + this.when + '\n' +
            '  where: ' + this.where + '\n' +
            '  locId: ' + this.locId + '\n' +
            '  nearby: ' + this.nearby + '\n' +
            '  nearbyAddress: ' + this.nearbyAddress + '\n' +
            '  what: ' + this.what + '\n' +
            '  fulltext: ' + this.fulltext + '\n' +
            '  subtype: ' + this.subtype + '\n' +
            '  type: ' + this.type + '\n' +
            '  sort: ' + this.sort + '\n' +
            '  perPage: ' + this.perPage + '\n' +
            '  pageNum: ' + this.pageNum + '' +
            '}';
    }
}

export class StarDocSearchFormFactory {
    static getSanitizedValues(values: {}): any  {
        const sanitizedValues = CommonDocSearchFormFactory.getSanitizedValues(values);

        sanitizedValues.where = StarDocSearchForm.sdocFields.where.validator.sanitize(values['where']) || '';
        sanitizedValues.locId = StarDocSearchForm.sdocFields.locId.validator.sanitize(values['locId']) || '';
        sanitizedValues.nearby = StarDocSearchForm.sdocFields.nearby.validator.sanitize(values['nearby']) || '';
        sanitizedValues.nearbyAddress = StarDocSearchForm.sdocFields.nearbyAddress.validator.sanitize(values['nearbyAddress']) || '';
        sanitizedValues.magnitude =
            StarDocSearchForm.sdocFields.magnitude.validator.sanitize(values['magnitude']) || '';
        sanitizedValues.designator = StarDocSearchForm.sdocFields.designator.validator.sanitize(values['designator']) || '';
        sanitizedValues.bvcoloridx = StarDocSearchForm.sdocFields.bvcoloridx.validator.sanitize(values['bvcoloridx']) || '';
        sanitizedValues.dimension = StarDocSearchForm.sdocFields.dimension.validator.sanitize(values['dimension']) || '';
        sanitizedValues.subtype = StarDocSearchForm.sdocFields.subtype.validator.sanitize(values['subtype']) || '';

        return sanitizedValues;
    }

    static getSanitizedValuesFromForm(searchForm: StarDocSearchForm): any {
        return StarDocSearchFormFactory.getSanitizedValues(searchForm);
    }

    static createSanitized(values: {}): StarDocSearchForm {
        const sanitizedValues = StarDocSearchFormFactory.getSanitizedValues(values);

        return new StarDocSearchForm(sanitizedValues);
    }

    static cloneSanitized(searchForm: StarDocSearchForm): StarDocSearchForm {
        const sanitizedValues = StarDocSearchFormFactory.getSanitizedValuesFromForm(searchForm);

        return new StarDocSearchForm(sanitizedValues);
    }
}

export class StarDocSearchFormValidator {
    static isValidValues(values: {}): boolean {
        let state = CommonDocSearchFormValidator.isValidValues(values);
        state = StarDocSearchForm.sdocFields.where.validator.isValid(values['where']) && state;
        state = StarDocSearchForm.sdocFields.locId.validator.isValid(values['locId']) && state;
        state = StarDocSearchForm.sdocFields.nearby.validator.isValid(values['nearby']) && state;
        state = StarDocSearchForm.sdocFields.nearbyAddress.validator.isValid(values['nearbyAddress']) && state;
        state = StarDocSearchForm.sdocFields.magnitude.validator.isValid(values['magnitude']) && state;
        state = StarDocSearchForm.sdocFields.designator.validator.isValid(values['designator']) && state;
        state = StarDocSearchForm.sdocFields.bvcoloridx.validator.isValid(values['bvcoloridx']) && state;
        state = StarDocSearchForm.sdocFields.dimension.validator.isValid(values['dimension']) && state;
        state = StarDocSearchForm.sdocFields.subtype.validator.isValid(values['subtype']) && state;

        return state;
    }

    static isValid(searchForm: StarDocSearchForm): boolean {
        return StarDocSearchFormValidator.isValidValues(searchForm);
    }
}
