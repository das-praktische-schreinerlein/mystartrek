import {GenericDataStore} from '@dps/mycms-commons/dist/search-commons/services/generic-data.store';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {StarDocSearchForm} from '../model/forms/sdoc-searchform';
import {StarDocRecord, StarDocRecordRelation} from '../model/records/sdoc-record';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {SearchParameterUtils} from '@dps/mycms-commons/dist/search-commons/services/searchparameter.utils';

export class StarDocTeamFilterConfig {
    private values = new Map();

    get(key: string): any {
        return this.values.get(key);
    }

    set(key: string, value: any) {
        this.values.set(key, value);
    }
}

export class StarDocDataStore extends GenericDataStore<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {

    static UPDATE_RELATION = [].concat(StarDocRecordRelation.hasOne ? Object.keys(StarDocRecordRelation.hasOne) : [])
        .concat(StarDocRecordRelation.hasMany ? Object.keys(StarDocRecordRelation.hasMany) : []);
    private validMoreNumberFilterNames = {
        id: true,
        loc_id_i: true,
        loc_lochirarchie_ids_txt: true,
        image_id_i: true,
        loc_parent_id_i: true
    };
    private validMoreInFilterNames = {
        playlists_txt: true
    };

    constructor(private searchParameterUtils: SearchParameterUtils, private teamFilterConfig: StarDocTeamFilterConfig) {
        super(StarDocDataStore.UPDATE_RELATION);
    }

    createQueryFromForm(searchForm: StarDocSearchForm): Object {
        const query = {};

        if (searchForm === undefined) {
            return query;
        }

        let filter: {} = undefined;
        let spatial: {} = undefined;
        if (searchForm.fulltext !== undefined && searchForm.fulltext.length > 0) {
            filter = filter || {};
            filter['html'] = {
                'likei': '%' + searchForm.fulltext + '%'
            };
        }
        if (searchForm.when !== undefined && searchForm.when.length > 0) {
            const keys = ['week', 'month', 'year'];
            const whenValues = this.searchParameterUtils.splitValuesByPrefixes(searchForm.when, ',', keys);
            for (const key of keys) {
                if (whenValues.has(key)) {
                    filter = filter || {};
                    filter[key + '_is'] = {
                        'in_number': this.searchParameterUtils.joinValuesAndReplacePrefix(whenValues.get(key), key, ',').split(/,/)
                    };
                }
            }
        }

        if (searchForm.locId !== undefined && searchForm.locId.length > 0) {
            filter = filter || {};
            filter['loc_id_i'] = {
                'in_number': searchForm.locId.split(/,/)
            };
        }
        if (searchForm.nearby !== undefined && searchForm.nearby.length > 0) {
            if (searchForm.nearby) {
                spatial = spatial || {};
                spatial['geo_loc_p'] = {
                    'nearby': searchForm.nearby
                };
            }
        }
        if (searchForm.where !== undefined && searchForm.where.length > 0) {
            const whereValues = this.searchParameterUtils.splitValuesByPrefixes(searchForm.where, ',', ['locId', 'nearby']);
            if (whereValues.has('locId')) {
                filter = filter || {};
                filter['loc_id_i'] = {
                    'in_number': this.searchParameterUtils.joinValuesAndReplacePrefix(whereValues.get('locId'), 'locId', ',').split(/,/)
                };
            }
            if (whereValues.has('nearby')) {
                spatial = spatial || {};
                spatial['geo_loc_p'] = {
                    'nearby': this.searchParameterUtils.joinValuesAndReplacePrefix(whereValues.get('nearby'), 'nearby:', ',')
                };
            }
            if (whereValues.has('unknown')) {
                filter = filter || {};
                filter['loc_lochirarchie_txt'] = {
                    'in': this.searchParameterUtils.joinValuesAndReplacePrefix(whereValues.get('unknown'), '', ',').split(/,/)
                };
            }
        }
        if (searchForm.what !== undefined && searchForm.what.length > 0) {
            filter = filter || {};
            filter['keywords_txt'] = {
                'in': searchForm.what.split(/,/)
            };
        }
        if (searchForm.type !== undefined && searchForm.type.length > 0) {
            filter = filter || {};
            filter['type_txt'] = {
                'in': searchForm.type.split(/,/)
            };
        }
        if (searchForm.subtype !== undefined && searchForm.subtype.length > 0) {
            filter = filter || {};
            filter['subtype_facet_ss'] = {
                'in': searchForm.subtype.split(/,/)
            };
        }
        if (searchForm.playlists !== undefined && searchForm.playlists.length > 0) {
            filter = filter || {};
            filter['playlists_txt'] = {
                'in': searchForm.playlists.split(/,/)
            };
        }
        if (searchForm.moreFilter !== undefined && searchForm.moreFilter.length > 0) {
            filter = filter || {};
            const moreFilters = searchForm.moreFilter.split(/;/);
            for (const index in moreFilters) {
                const moreFilter = moreFilters[index];
                const [filterName, values] = moreFilter.split(/:/);
                if (filterName && values && this.validMoreNumberFilterNames[filterName] === true) {
                    filter[filterName] = {
                        'in_number': values.split(/,/)
                    };
                } else if (filterName && values && this.validMoreInFilterNames[filterName] === true) {
                    filter[filterName] = {
                        'in': values.split(/,/)
                    };
                }

            }
        }

        if (searchForm.magnitude !== undefined && searchForm.magnitude.length > 0) {
            filter = filter || {};
            filter['magnitude_facet_is'] = {
                'in_number': searchForm.magnitude.split(/,/)
            };
        }
        if (searchForm.designator !== undefined && searchForm.designator.length > 0) {
            filter = filter || {};
            filter['designator_facet_ss'] = {
                'in': searchForm.designator.split(/,/)
            };
        }
        if (searchForm.bvcoloridx !== undefined && searchForm.bvcoloridx.length > 0) {
            filter = filter || {};
            filter['bvcoloridx_facet_ss'] = {
                'in': searchForm.bvcoloridx.split(/,/)
            };
        }
        if (searchForm.dimension !== undefined && searchForm.dimension.length > 0) {
            filter = filter || {};
            filter['dimension_facet_ss'] = {
                'in': searchForm.dimension.split(/,/)
            };
        }
        if (searchForm.subtype !== undefined && searchForm.subtype.length > 0) {
            filter = filter || {};
            filter['subtype_facet_ss'] = {
                'in': searchForm.subtype.split(/,/)
            };
        }

        if (filter !== undefined) {
            query['where'] = filter;
        }
        if (spatial !== undefined) {
            query['spatial'] = spatial;
        }

        const additionalFilter = this.createThemeFilterQueryFromForm(searchForm);
        if (additionalFilter !== undefined) {
            query['additionalWhere'] = additionalFilter;
        }

        return query;
    }

    createThemeFilterQueryFromForm(searchForm: StarDocSearchForm): Object {
        let queryFilter: {} = undefined;
        if (searchForm === undefined) {
            return queryFilter;
        }

        let filter: {} = undefined;
        if (searchForm.theme !== undefined && searchForm.theme.length > 0 && this.teamFilterConfig.get(searchForm.theme)) {
            filter = filter || {};
            const themeFilter = this.teamFilterConfig.get(searchForm.theme);
            for (const filterProp in themeFilter) {
                filter[filterProp] = themeFilter[filterProp];
            }
        }

        if (filter !== undefined) {
            queryFilter = filter;
        }

        return queryFilter;
    }

    createSearchResult(searchForm: StarDocSearchForm, recordCount: number, records: StarDocRecord[], facets: Facets): StarDocSearchResult {
        return new StarDocSearchResult(searchForm, recordCount, records, facets);
    }

}
