import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const GeoDocDataInfoRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'GeoDocDataInfo',
    description: 'Schema for a GeoDocDataInfo Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        baseloc: {type: 'string'},
        destloc: {type: 'string'},
        guides: {type: 'string'},
        region: {type: 'string'},
        gdoc_id: {type: 'string', indexed: true}
    }
});
