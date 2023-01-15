import {StarDocRecord} from '../model/records/sdoc-record';
import {StarDocSearchForm} from '../model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {StarDocAdapterResponseMapper} from './sdoc-adapter-response.mapper';
import {ItemsJsConfig} from '@dps/mycms-commons/dist/search-commons/services/itemsjs-query.builder';
import {GenericItemsJsAdapter} from '@dps/mycms-commons/dist/search-commons/services/generic-itemsjs.adapter';
import {ExtendedItemsJsConfig} from '@dps/mycms-commons/dist/search-commons/services/itemsjs.dataimporter';

export class StarDocItemsJsAdapter extends GenericItemsJsAdapter<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    public static itemsJsConfig: ExtendedItemsJsConfig = {
        skipMediaCheck: false,
        aggregationFields: ['id', 'loc_id_i'],
        refConfigs: [],
        spatialField: 'geo_loc_p',
        spatialSortKey: 'distance',
        searchableFields: ['id', 'image_id_i', 'loc_id_i',
            'dateshow_dt', 'desc_txt', 'desc_md_txt', 'desc_html_txt', 'geo_lon_s', 'geo_lat_s', 'geo_ele_s', 'geo_loc_p',
            'designator_s', 'keywords_txt', 'bvcoloridx_s', 'dimension_s', 'name_s', 'type_s',
            'playlists_txt',
            'subtype_facet_ss', 'subtype_s', 'i_fav_url_txt'],
        aggregations: {
            'subtype_facet_ss': {
            },
            'designator_facet_ss': {
            },
            'keywords_txt': {
            },
            'subtype_ss': {
                mapField: 'subtype_s',
                conjunction: false,
                sort: 'term',
                order: 'asc',
                hide_zero_doc_count: true,
                size: 1000
            },
            'type_txt': {
                mapField: 'type_s',
                conjunction: false,
                sort: 'term',
                order: 'asc',
                hide_zero_doc_count: false,
                size: 1000
            },
            'id': {
                conjunction: false,
                sort: 'term',
                order: 'asc',
                hide_zero_doc_count: true,
                size: 1000
            },
            'UNDEFINED_FILTER': {
                mapField: 'id',
                field: 'id',
                conjunction: true,
                sort: 'term',
                order: 'asc',
                hide_zero_doc_count: true,
                size: 1000
            }
        },
        sortings: {
            'date': {
                field: 'dateonly_s',
                order: 'desc'
            },
            'dateAsc': {
                field: 'date_dt',
                order: 'asc'
            },
            'distance': {
                field: 'geodist()',
                order: 'asc'
            },
            'location': {
                field: 'bvcoloridx_s',
                order: 'asc'
            },
            'relevance': {
            }
        },
        filterMapping: {
            'html': 'html_txt'
        },
        fieldMapping: {
        }
    };

    constructor(config: any, records: any, itemsJsConfig: ExtendedItemsJsConfig) {
        console.debug('init itemsjs with config', itemsJsConfig, records ? records.length : 0);
        super(config, new StarDocAdapterResponseMapper(config), records, itemsJsConfig);
    }

    mapToAdapterDocument(props: any): any {
        const values = {
            id: props.id,
            image_id_i: props.imageId,
            loc_id_i: props.locId,
            dateshow_dt: props.dateshow,
            desc_txt: props.descTxt,
            desc_md_txt: props.descMd,
            desc_html_txt: props.descHtml,
            geo_lon_s: props.geoLon,
            geo_lat_s: props.geoLat,
            geo_ele_s: props.geoEle,
            geo_loc_p: props.geoLoc,
            designator_s: props.designator,
            keywords_txt: (props.keywords ? props.keywords.split(', ').join(',,KW_') : ''),
            bvcoloridx_s: (props.bvcoloridx ? props.bvcoloridx
                .toLowerCase()
                .replace(/[ ]*->[ ]*/g, ',,')
                .replace(/ /g, '_') : ''),
            dimension_s: (props.dimension ? props.dimension
                .toLowerCase()
                .replace(/,/g, ',,')
                .replace(/ /g, '_') : ''),
            name_s: props.name,
            playlists_txt: (props.playlists ? props.playlists.split(', ').join(',,') : ''),
            type_s: props.type,

        };

        values['html_txt'] = [values.desc_txt, values.name_s, values.keywords_txt, values.type_s].join(' ');

        return values;
    }

    getItemsJsConfig(): ItemsJsConfig {
        return StarDocItemsJsAdapter.itemsJsConfig;
    }
}

