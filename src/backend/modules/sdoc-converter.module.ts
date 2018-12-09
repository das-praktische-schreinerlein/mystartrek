import {Router} from 'js-data-express';
import {Mapper} from 'js-data';
import {StarDocRecord} from '../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDataService} from '../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocAdapterResponseMapper} from '../shared/sdoc-commons/services/sdoc-adapter-response.mapper';
import * as fs from 'fs';
import {ServerLogUtils} from '@dps/mycms-server-commons/dist/server-commons/serverlog.utils';
import {Feature, FeatureCollection} from 'geojson';

export class StarDocConverterModule {
    private dataService: StarDocDataService;
    private backendConfig: {};
    private keywordSrcLst = ['natural', 'tourism', 'surface', 'condition', 'man_made', 'amenity'];

    constructor(backendConfig, dataService: StarDocDataService) {
        this.dataService = dataService;
        this.backendConfig = backendConfig;
    }

    public convertGeoJSONOStarDoc(srcFile: string, type: string): Promise<StarDocRecord[]> {
        const mapper: Mapper = this.dataService.getMapper('sdoc');
        const responseMapper = new StarDocAdapterResponseMapper(this.backendConfig);
        const records: StarDocRecord[] = [];
        const geoJsonObj: FeatureCollection = JSON.parse(fs.readFileSync(srcFile, {encoding: 'utf8'}));
        return new Promise<StarDocRecord[]>((resolve, reject) => {
            const rootType = geoJsonObj.type;
            if (rootType !== 'FeatureCollection') {
                return reject('no valid geojson - type of FeatureCollection required - current:' + ServerLogUtils.sanitizeLogMsg(rootType));
            }

            const features: Feature[] = geoJsonObj.features;
            if (features == undefined || features.length <= 0) {
                return resolve([]);
            }

            for (let i = 0; i < features.length; i++) {
                const feature: Feature = features[i];
                if (feature.type !== 'Feature') {
                    return reject('no valid geojson - type of Feature required - current '  + i + ':' + ServerLogUtils.sanitizeLogMsg(feature));
                }

                let geoLat = undefined;
                let geoLon = undefined;
                let geoLoc = undefined;

                if (feature.properties['name'] === undefined || feature.properties['name'].length <= 0) {
                    continue;
                }

                const keywords = [];
                for (let k = 0; k < this.keywordSrcLst.length; k++) {
                    const keywordsSrc = this.keywordSrcLst[k];
                    if (feature.properties[keywordsSrc] !== undefined) {
                        keywords.push(keywordsSrc + '_' + feature.properties[keywordsSrc]);
                    }
                }

                if (feature.geometry !== undefined) {
                    if (feature.geometry.type === 'Point') {
                        geoLon = feature.geometry.coordinates[0];
                        geoLat = feature.geometry.coordinates[1];
                    } else if (feature.geometry.type === 'Polygon') {
                        geoLon = feature.geometry.coordinates[0][0][0];
                        geoLat = feature.geometry.coordinates[0][0][1];
                    }

                    if (geoLat !== undefined && geoLon !== undefined) {
                        geoLoc = geoLat+ ',' + geoLon;
                    }
                }

                let guides = [];
                if (feature.properties['wikidata']) {
                    guides.push('https://www.wikidata.org/wiki/' + feature.properties['wikidata']);
                }
                if (feature.properties['wikipedia']) {
                    guides.push('https://en.wikipedia.org/wiki/' + feature.properties['wikipedia']);
                }

                let designator = feature.properties['desig'];
                if (!designator) {
                    const tmp =  (feature.properties['name'] + '').toUpperCase().replace(/[-0-9 _]+/g, '');
                    if (tmp === 'M' || tmp === 'NGC') {
                        designator = tmp;
                    }
                }

                const geoObj = <StarDocRecord>responseMapper.mapResponseDocument(mapper, {
                    type_s: type,
                    id: feature.id,
                    geo_lat_s: geoLat,
                    geo_lon_s: geoLon,
                    geo_loc_p: geoLoc,
                    geo_ele_s: feature.properties['ele'],
                    keywords_txt: keywords.join((', ')),
                    magnitude_s: feature.properties['mag'] + '',
                    bvcoloridx_s: feature.properties['bv'],
                    designator_s: designator,
                    subtype_s: feature.properties['type'],
                    dimension_s: feature.properties['dim'],
                    data_info_guides_s: guides.join(';'),
                    loc_id_i: records.length + 1,
                    name_s: feature.properties['name']
                }, {});
                records.push(geoObj);
            }

            return resolve(records);
        });
    }
}
