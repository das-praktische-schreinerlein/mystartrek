import {BaseEntityRecordSchema} from '@dps/mycms-commons/dist/search-commons/model/schemas/base-entity-record-schema';
import {Schema} from 'js-data';

export const StarDocImageRecordSchema = new Schema({
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'StarDocImage',
    description: 'Schema for a StarDocImage Record.',
    extends: BaseEntityRecordSchema,
    type: 'object',
    properties: {
        descTxt: {type: 'string'},
        descMd: {type: 'string'},
        descHtml: {type: 'string'},
        fileName: {type: 'string'},
        name: {type: 'string'},
        sdoc_id: {type: 'string', indexed: true}
    }
});
