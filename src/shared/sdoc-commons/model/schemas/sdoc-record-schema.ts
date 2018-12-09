import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const StarDocRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'StarDoc',
    description: 'Schema for a StarDoc Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        imageId: {type: 'number'},
        locId: {type: 'number'},
        locIdParent: {type: 'number'},
        descTxt: {type: 'string'},
        descMd: {type: 'string'},
        descHtml: {type: 'string'},
        geoDistance: {type: 'number'},
        geoLon: {type: 'string'},
        geoLat: {type: 'string'},
        geoEle: {type: 'string'},
        geoLoc: {type: 'string'},
        magnitude: {type: 'string'},
        designator: {type: 'string'},
        keywords: {type: 'string'},
        bvcoloridx: {type: 'string'},
        dimension: {type: 'string'},
        name: {type: 'string', minLength: 1, maxLength: 255},
        playlists: {type: 'string'},
        subtype: {type: 'string'},
        type: {type: 'string', minLength: 1, maxLength: 255}
    }
});
