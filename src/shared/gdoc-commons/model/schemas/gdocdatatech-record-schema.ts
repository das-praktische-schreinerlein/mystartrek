import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const GeoDocDataTechRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'GeoDocDataTech',
    description: 'Schema for a GeoDocDataTech Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        altAsc: {type: 'number'},
        altDesc: {type: 'number'},
        altMax: {type: 'number'},
        altMin: {type: 'number'},
        dist: {type: 'number'},
        dur: {type: 'number'},
        gdoc_id: {type: 'string', indexed: true}
    }
});
