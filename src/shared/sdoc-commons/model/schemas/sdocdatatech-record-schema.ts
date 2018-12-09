import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const StarDocDataTechRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'StarDocDataTech',
    description: 'Schema for a StarDocDataTech Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        dur: {type: 'number'},
        sdoc_id: {type: 'string', indexed: true}
    }
});
