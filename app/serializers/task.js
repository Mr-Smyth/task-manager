import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class TaskSerializer extends JSONAPISerializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        return {}
    }
}
