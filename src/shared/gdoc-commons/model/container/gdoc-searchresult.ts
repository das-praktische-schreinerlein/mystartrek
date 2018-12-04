import {GeoDocSearchForm} from '../forms/gdoc-searchform';
import {GeoDocRecord} from '../records/gdoc-record';
import {Facet, Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {CommonDocSearchResult} from '@dps/mycms-commons/dist/search-commons/model/container/cdoc-searchresult';

export class GeoDocSearchResult extends CommonDocSearchResult <GeoDocRecord, GeoDocSearchForm> {
    constructor(gdocSearchForm: GeoDocSearchForm, recordCount: number, currentRecords: GeoDocRecord[], facets: Facets) {
        super(gdocSearchForm, recordCount, currentRecords, facets);
    }

    toString() {
        return 'GeoDocSearchResult {\n' +
            '  facets: ' + this.facets + '' +
            '  currentRecords: ' + this.currentRecords + '' +
            '  recordCount: ' + this.recordCount + '' +
            '  searchFormGroup: ' + this.searchForm + '' +
            '}';
    }

    toSerializableJsonObj(anonymizeMedia?: boolean): {} {
        const result = {
            'recordCount': this.recordCount,
            'searchForm': this.searchForm,
            'currentRecords': [],
            'facets': {
                facets: {},
                selectLimits: {}
            }
        };
        if (Array.isArray(this.currentRecords)) {
            for (let i = 0; i < this.currentRecords.length; i++) {
                const record = GeoDocRecord.cloneToSerializeToJsonObj(this.currentRecords[i], anonymizeMedia);

                result.currentRecords.push(record);
            }
        }
        if (this.facets && this.facets.facets) {
            this.facets.facets.forEach((value: Facet, key: string) => {
                result.facets.facets[key] = this.facets.facets.get(key).facet;
                result.facets.selectLimits[key] = this.facets.facets.get(key).selectLimit;
            });
        }
        return result;
    }
}
