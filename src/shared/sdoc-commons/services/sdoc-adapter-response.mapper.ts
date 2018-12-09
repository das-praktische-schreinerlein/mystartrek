import {Mapper, Record} from 'js-data';
import {StarDocRecord, StarDocRecordFactory} from '../model/records/sdoc-record';
import {StarDocImageRecord, StarDocImageRecordFactory} from '../model/records/sdocimage-record';
import {MapperUtils} from '@dps/mycms-commons/dist/search-commons/services/mapper.utils';
import {GenericAdapterResponseMapper} from '@dps/mycms-commons/dist/search-commons/services/generic-adapter-response.mapper';
import {BeanUtils} from '@dps/mycms-commons/dist/commons/utils/bean.utils';
import {StarDocDataTechRecordFactory} from '../model/records/sdocdatatech-record';
import {StarDocDataInfoRecordFactory} from '../model/records/sdocdatainfo-record';

export class StarDocAdapterResponseMapper implements GenericAdapterResponseMapper {
    protected mapperUtils = new MapperUtils();
    protected config: {} = {};

    constructor(config: any) {
        this.config = config;
    }

    mapToAdapterDocument(mapping: {}, props: StarDocRecord): any {
        const values = {};
        values['id'] = props.id;
        values['image_id_i'] = props.imageId;
        values['loc_id_i'] = props.locId;
        values['loc_id_parent_i'] = props.locIdParent;

        values['blocked_i'] = props.blocked;
        values['dateshow_dt'] = props.dateshow;
        values['desc_txt'] = props.descTxt;
        values['desc_md_txt'] = props.descMd;
        values['desc_html_txt'] = props.descHtml;
        values['keywords_txt'] =
            (props.keywords ? props.keywords.split(', ').join(',') : '');

        values['name_s'] = props.name;
        values['playlists_txt'] =
            (props.playlists ? props.playlists.split(', ').join(',,') : '');
        values['type_s'] = props.type;
        values['subtype_s'] = props.subtype;

        values['geo_lon_s'] = props.geoLon;
        values['geo_lat_s'] = props.geoLat;
        values['geo_ele_s'] = props.geoEle;
        values['geo_loc_p'] = props.geoLoc;
        values['magnitude_s'] = props.magnitude;
        values['designator_s'] = props.designator;
        values['bvcoloridx_s'] = props.bvcoloridx;
        values['dimension_s'] = props.dimension;

        values['html_txt'] = [
            values['desc_txt'],
            values['name_s'],
            values['keywords_txt'],
            values['type_s']].join(' ');

        if (props.get('sdocimages') && props.get('sdocimages').length > 0) {
            const image: StarDocImageRecord = props.get('sdocimages')[0];
            values['i_fav_url_txt'] = image.fileName;
        }

        values['data_tech_dur_f'] = BeanUtils.getValue(props, 'sdocdatatech.dur');

        values['data_info_guides_s'] = BeanUtils.getValue(props, 'sdocdatainfo.guides');

        return values;
    }

    mapValuesToRecord(mapper: Mapper, values: {}): StarDocRecord {
        const record = StarDocRecordFactory.createSanitized(values);

        for (const mapperKey of ['sdocdatatech', 'sdocdatainfo']) {
            const subMapper = mapper['datastore']._mappers[mapperKey];
            let subValues;
            for (const key in values) {
                if (key.startsWith(mapperKey + '.')) {
                    const subKey = key.replace(mapperKey + '.', '');
                    subValues = subValues || {};
                    subValues[subKey] = values[key];
                }
            }

            if (subValues) {
                record.set(mapperKey, subMapper.createRecord(subValues));
            } else {
                record.set(mapperKey, undefined);
            }
        }

        return record;
    }

    mapResponseDocument(mapper: Mapper, doc: any, mapping: {}): Record {
        const dataTechMapper = mapper['datastore']._mappers['sdocdatatech'];
        const dataInfoMapper = mapper['datastore']._mappers['sdocdatainfo'];

        const values = {};
        values['id'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'id', undefined);
        values['imageId'] = this.mapperUtils.getMappedAdapterNumberValue(mapping, doc, 'image_id_i', undefined);
        values['locId'] = this.mapperUtils.getMappedAdapterNumberValue(mapping, doc, 'loc_id_i', undefined);
        values['locIdParent'] = this.mapperUtils.getMappedAdapterNumberValue(mapping, doc, 'loc_id_parent_i', undefined);

        values['blocked'] = this.mapperUtils.getMappedAdapterNumberValue(mapping, doc, 'blocked_i', undefined);
        values['descTxt'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'desc_txt', undefined);
        values['descHtml'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'desc_html_txt', undefined);
        values['descMd'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'desc_md_txt', undefined);
        values['geoDistance'] = this.mapperUtils.getAdapterCoorValue(doc,
            this.mapperUtils.mapToAdapterFieldName(mapping, 'distance'), undefined);
        values['geoLon'] = this.mapperUtils.getAdapterCoorValue(doc,
            this.mapperUtils.mapToAdapterFieldName(mapping, 'geo_lon_s'), undefined);
        values['geoLat'] = this.mapperUtils.getAdapterCoorValue(doc,
            this.mapperUtils.mapToAdapterFieldName(mapping, 'geo_lat_s'), undefined);
        values['geoEle'] = this.mapperUtils.getAdapterCoorValue(doc,
            this.mapperUtils.mapToAdapterFieldName(mapping, 'geo_ele_s'), undefined);
        values['geoLoc'] = this.mapperUtils.getAdapterCoorValue(doc,
            this.mapperUtils.mapToAdapterFieldName(mapping, 'geo_loc_p'), undefined);
        values['magnitude'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'magnitude_s', undefined);
        values['designator'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'designator_s', undefined);

        const origKeywordsArr = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'keywords_txt', '').split(',');
        const newKeywordsArr = [];
        const allowedKeywordPatterns = BeanUtils.getValue(this.config, 'mapperConfig.allowedKeywordPatterns');
        for (let keyword of origKeywordsArr) {
            keyword = keyword.trim();
            if (keyword === '') {
                continue;
            }

            if (allowedKeywordPatterns && allowedKeywordPatterns.length > 0) {
                for (const pattern of allowedKeywordPatterns) {
                    if (keyword.match(new RegExp(pattern))) {
                        newKeywordsArr.push(keyword);
                        break;
                    }
                }
            } else {
                newKeywordsArr.push(keyword);
            }
        }
        const replaceKeywordPatterns = BeanUtils.getValue(this.config, 'mapperConfig.replaceKeywordPatterns');
        if (replaceKeywordPatterns && replaceKeywordPatterns.length > 0) {
            for (let i = 0; i < newKeywordsArr.length; i++) {
                let keyword = newKeywordsArr[i];
                for (const pattern of replaceKeywordPatterns) {
                    keyword = keyword.replace(new RegExp(pattern[0]), pattern[1]);
                }
                newKeywordsArr[i] = keyword;
            }
        }
        values['keywords'] = newKeywordsArr.join(', ');

        values['name'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'name_s', undefined);
        values['playlists'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'playlists_txt', '')
            .split(',,').join(', ');
        values['subtype'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'subtype_s', undefined);
        values['type'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'type_s', undefined);
        values['bvcoloridx'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'bvcoloridx_s', undefined);
        values['dimension'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'dimension_s', undefined);

        // console.log('mapResponseDocument values:', values);
        const record: StarDocRecord = <StarDocRecord>mapper.createRecord(
            StarDocRecordFactory.instance.getSanitizedValues(values, {}));

        const imageField = doc[this.mapperUtils.mapToAdapterFieldName(mapping, 'i_fav_url_txt')];
        let imageDocs = [];
        if (imageField !== undefined) {
            if (Array.isArray(imageField)) {
                imageDocs = imageField;
            } else {
                imageDocs.push(imageField);
            }
            this.mapImageDocsToAdapterDocument(mapper, record, imageDocs);
        } else {
            record.set('sdocimages', []);
        }
        // console.log('mapResponseDocument record full:', record);


        const dataTechValues = {};
        dataTechValues['dur'] = this.mapperUtils.getMappedAdapterNumberValue(mapping, doc, 'data_tech_dur_f', undefined);
        let dataTechSet = false;
        for (const field in dataTechValues) {
            if (dataTechValues[field] !== undefined && dataTechValues[field] !== 0) {
                dataTechSet = true;
                break;
            }
        }

        if (dataTechSet) {
            record.set('sdocdatatech', dataTechMapper.createRecord(
                StarDocDataTechRecordFactory.instance.getSanitizedValues(dataTechValues, {})));
        } else {
            record.set('sdocdatatech', undefined);
        }

        const dataInfoValues = {};
        dataInfoValues['guides'] = this.mapperUtils.getMappedAdapterValue(mapping, doc, 'data_info_guides_s', undefined);
        let dataInfoSet = false;
        for (const field in dataInfoValues) {
            if (dataInfoValues[field] !== undefined && (dataInfoValues[field] + '').length > 0) {
                dataInfoSet = true;
                break;
            }
        }

        if (dataInfoSet) {
            record.set('sdocdatainfo', dataInfoMapper.createRecord(
                StarDocDataInfoRecordFactory.instance.getSanitizedValues(dataInfoValues, {})));
        } else {
            record.set('sdocdatainfo', undefined);
        }

        // console.log('mapResponseDocument record full:', record);

        return record;
    }

    mapDetailDataToAdapterDocument(mapper: Mapper, profile: string, record: Record, docs: any[]): void {
        switch (profile) {
            case 'image':
                const imageUrls = [];
                docs.forEach(doc => {
                    imageUrls.push(doc['i_fav_url_txt']);
                });
                this.mapImageDocsToAdapterDocument(mapper, <StarDocRecord>record, imageUrls);
                break;
            case 'keywords':
                let keywords = '';
                docs.forEach(doc => {
                    if (doc['keywords'] !== undefined && doc['keywords'] !== null) {
                        keywords = doc['keywords'];
                    }
                });
                (<StarDocRecord>record).keywords = keywords;
                break;
        }
    }

    private mapImageDocsToAdapterDocument(mapper: Mapper, record: StarDocRecord, imageDocs: any[]) {
        const imageMapper = mapper['datastore']._mappers['sdocimage'];
        const images: StarDocImageRecord[] = [];
        if (imageDocs !== undefined) {
            let id = 1;
            if (record.type === 'LOCATION') {
                id = Number(record.locId);
            } else if (record.type === 'IMAGE') {
                id = Number(record.imageId);
            }
            id = id * 1000000;

            for (const imageDoc of imageDocs) {
                if (imageDoc === undefined || imageDoc === null) {
                    continue;
                }
                const imageValues = {};
                imageValues['name'] = record.name;
                imageValues['id'] = (id++).toString();
                imageValues['fileName'] = imageDoc;
                const imageRecord = imageMapper.createRecord(
                    StarDocImageRecordFactory.instance.getSanitizedValues(imageValues, {}));
                images.push(imageRecord);
            }
        }
        record.set('sdocimages', images);
    }
}

