import {GenericSolrAdapter} from '@dps/mycms-commons/dist/search-commons/services/generic-solr.adapter';
import {StarDocRecord} from '../model/records/sdoc-record';
import {StarDocSearchForm} from '../model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../model/container/sdoc-searchresult';
import {StarDocAdapterResponseMapper} from './sdoc-adapter-response.mapper';
import {SolrConfig} from '@dps/mycms-commons/dist/search-commons/services/solr-query.builder';
import {Mapper} from "js-data";
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';

export class StarDocSolrAdapter extends GenericSolrAdapter<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {

    public static solrConfig: SolrConfig = {
        spatialField: 'geo_loc_p',
        spatialSortKey: 'distance',
        fieldList: ['id', 'image_id_i', 'loc_id_i',
            'dateshow_dt', 'desc_txt', 'desc_md_txt', 'desc_html_txt', 'geo_lon_s', 'geo_lat_s', 'geo_dele_s', 'geo_loc_p',
            'data_tech_dur_f',
            'data_info_guides_s',
            'designator_s', 'magnitude_s', 'keywords_txt', 'bvcoloridx_s', 'dimension_s', 'name_s', 'type_s',
            'subtype_s', 'i_fav_url_txt'],
        facetConfigs: {
            'subtype_facet_ss': {
                'f.subtype_facet_ss.facet.limit': '-1',
                'f.subtype_facet_ss.facet.sort': 'index'
            },
            'designator_facet_ss': {
                'f.designator_facet_ss.facet.limit': '-1',
                'f.designator_facet_ss.facet.sort': 'index'
            },
            'magnitude_facet_is': {
                'f.magnitude_facet_is.facet.limit': '-1',
                'f.magnitude_facet_is.facet.sort': 'index'
            },
            'bvcoloridx_facet_ss': {
                'f.bvcoloridx_facet_ss.facet.limit': '-1',
                'f.bvcoloridx_facet_ss.facet.sort': 'index'
            },
            'dimension_facet_ss': {
                'f.dimension_facet_ss.facet.limit': '-1',
                'f.dimension_facet_ss.facet.sort': 'index'
            },
            'keywords_txt': {
                'f.keywords_txt.facet.prefix': '',
                'f.keywords_txt.facet.limit': '-1',
                'f.keywords_txt.facet.sort': 'count'
            },
            'month_is': {
                'f.month_is.facet.limit': '-1',
                'f.month_is.facet.sort': 'index'
            },
            'playlists_txt': {
            },
            'type_txt': {
            },
            'week_is': {
                'f.week_is.facet.limit': '-1',
                'f.week_is.facet.sort': 'index'
            },
            'year_is': {
                'f.year_is.facet.limit': '-1',
                'f.year_is.facet.sort': 'index'
            }
        },
        commonSortOptions: {
            'bq': 'type_s:IMAGE^1',
            'qf': 'html_txt^12.0 name_txt^10.0 desc_txt^8.0 keywords_txt^6.0 loc_lochirarchie_txt^4.0',
            'defType': 'edismax',
            'boost': 'recip(rord(date_dts),1,1000,1000)'
        },
        sortMapping: {
            'distance': {
                'sort': 'geodist() asc'
            },
            'dimension': {
                'sort': 'dimension_s asc'
            },
            'magnitude': {
                'sort': 'magnitude_s asc'
            },
            'designator': {
                'sort': 'designator_s asc'
            },
            'bvcoloridx': {
                'sort': 'bvcoloridx_s asc'
            },
            'relevance': {
            }
        },
        filterMapping: {
            'html': 'html_txt'
        },
        fieldMapping: {}
    };

    constructor(config: any) {
        super(config, new StarDocAdapterResponseMapper(config));
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
            keywords_txt: (props.keywords ? props.keywords.split(', ').join(',,') : ''),
            name_s: props.name,
            playlists_txt: (props.playlists ? props.playlists.split(', ').join(',,') : ''),
            type_s: props.type,
            type_txt: props.type,
            subtype_s: props.subtype,
            subtype_facet_ss: props.subtype,

            geo_lon_s: props.geoLon,
            geo_lat_s: props.geoLat,
            geo_ele_s: props.geoEle,
            geo_loc_p: props.geoLoc,
            designator_s: props.designator,
            magnitude_s: props.magnitude,
            bvcoloridx_s: props.bvcoloridx,
            dimension_s: props.dimension,
            magnitude_facet_is: this.parseFacet(props.magnitude, 1),
            designator_facet_ss: props.designator,
            bvcoloridx_facet_ss: props.bvcoloridx,
            dimension_facet_ss: props.dimension,

            data_info_guides_s: BeanUtils.getValue(props, 'sdocdatainfo.guides')
        };
        values['html_txt'] = [values.desc_txt, values.name_s, values.keywords_txt, values.type_s].join(' ');

        return values;
    }

    create(mapper: Mapper, record: any, opts?: any): Promise<StarDocRecord> {
        opts = opts || {};
        if (opts.realSource) {
            record = opts.realSource;
        }

        return super.create(mapper, record, opts);
    }

    update(mapper: Mapper, id: string | number, record: any, opts?: any): Promise<StarDocRecord> {
        opts = opts || {};
        if (opts.realSource) {
            record = opts.realSource;
        }

        return super.update(mapper, id, record, opts);
    }

    getHttpEndpoint(method: string): string {
        const updateMethods = ['create', 'destroy', 'update'];
        if (updateMethods.indexOf(method.toLowerCase()) >= 0) {
            return 'update?';
        }
        return 'select?';
    }

    getSolrConfig(): SolrConfig {
        return StarDocSolrAdapter.solrConfig;
    }

    findAll(mapper: Mapper, query: any, opts: any): Promise<StarDocRecord[]> {
        opts.offset = opts.offset || 0;
        opts.limit = opts.limit || 10;
        return super.findAll(mapper, query, opts);
    }

    protected parseFacet(value: any, base: number): string {
        return (value ? Math.ceil(Number.parseFloat(value) / base) * base + '' : undefined)
    }

}

