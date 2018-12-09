import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const StarDocDataInfoRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'StarDocDataInfo',
    description: 'Schema for a StarDocDataInfo Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        guides: {type: 'string'},
        sdoc_id: {type: 'string', indexed: true}
    }
});
