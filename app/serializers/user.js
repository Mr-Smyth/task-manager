// app/serializers/user.js
import JSONAPISerializer from '@ember-data/serializer/json-api';

/* 

A serializer has two main roles in Ember Data. 
First it is responsible for taking a response from an adapter and serializing 
it into the normalized JSON format that Ember Data understands. 

Secondly, it transforms snapshots of records into a payload the adapter 
will send to the server when creating, updating or deleting a record. 

*/

export default class UserSerializer extends JSONAPISerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let serializedData;

    // Convert all IDs to strings to avoid type mismatches
    const convertIdToString = (id) => id ? id.toString() : null;

    if (requestType === 'findAll') {
      serializedData = {
        data: (payload.users).map((user) => ({
          type: 'user', // match with the correct model
          id: user.id.toString(),
          attributes: {
            name: `${user.first_name} ${user.last_name}`,
            description: user.description,
          },
          relationships: {
            tasks: {
              data: (user.taskIds || []).map((taskId) => ({
                type: 'task', // match with the correct model
                id: taskId.toString(),
              })),
            },
          },
        })),
      };
    } else if (requestType === 'createRecord') {
      serializedData = {
        data: {
          type: 'user', // match with the correct model
          id: payload.id.toString(),
          attributes: {
            name: `${payload.first_name} ${payload.last_name}`,
            description: payload.description,
          },
          relationships: {
            tasks: {
              data: (payload.taskIds || []).map((taskId) => ({
                type: 'task', // match with the correct model
                id: taskId.toString(),
              })),
            },
          },
        },
      };
    }

    return super.normalizeResponse(store, primaryModelClass, serializedData, id, requestType);
  }

  /* To adjust the created user name especially in cases where ther are 3 or more names - John Murphy Smyth
  In those cases im going to add the middle names as first names
   */
  serialize(snapshot, options) {
    const json = super.serialize(snapshot, options);
  
    const fullName = snapshot.attr('name');
    const nameParts = fullName.split(' ');
  
    // Handle names with multiple parts
    const firstName = nameParts.slice(0, -1).join(' ');
    const lastName = nameParts[nameParts.length - 1];
  
    // Modify the default serialized data
    json.first_name = firstName;
    json.last_name = lastName;
    json.description = snapshot.attr('description');
  
    return json;
  }  
}
