// app/serializers/user.js
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class UserSerializer extends JSONAPISerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    // Transform the payload into a format the store expects
    // had been handled by the data-loader service
    let serializedData = {
      data: payload.users.map(user => ({
        type: 'user', // match with the correct model
        id: user.id,
        attributes: {
          name: `${user.first_name} ${user.last_name}`,
          description: user.description,
        },
        relationships: {
          tasks: {
            data: user.taskIds.map(taskId => ({
              type: 'task', // match with the correct model
              id: taskId,
            })),
          },
        },
      })),
    };

    // needed to append 'super.' to include any functionality like linking to the correct model that the base class performs
    return super.normalizeResponse(store, primaryModelClass, serializedData, id, requestType);
  }
}