// // app/serializers/user.js
// import JSONAPISerializer from '@ember-data/serializer/json-api';

// export default class UserSerializer extends JSONAPISerializer {
//   // Define attribute mappings using the `attrs` property
//   attrs = {
//     firstName: 'first_name', // Map API `first_name` to model `firstName`
//     lastName: 'last_name', // Map API `last_name` to model `lastName`
//     description: 'description', // Maps directly to model attribute
//     tasks: { key: 'taskIds' }, // Map the `tasks` relationship to `taskIds`
//   };

//   /*
//    * This method normalizes the response from the API to ensure it fits the
//    * JSON API specification expected by Ember Data. It adjusts the payload
//    * for both creating a new user and retrieving existing users.
//    *
//    * When creating a user, the API only expects name and description fields.
//    * For retrieving users, the structure needs to conform to the JSON API
//    * format. Although adjusting the server would be ideal, handling
//    * API inconsistencies directly in the client is a more realistic approach.
//    */
//   normalizeResponse(store, primaryModelClass, payload, id, requestType) {
//     let users;

//     // Create a function to map user data to the desired JSON API structure
//     const mappedUser = (user) => ({
//       type: 'user', // Specifies the type of resource
//       id: user.id.toString(), // Ensures the ID is a string
//       attributes: {
//         // Use the attrs mapping for dynamic access to API fields
//         // Square brackets compute the key names dynamically
//         // e.g., [this.attrs.firstName] translates to 'first_name'
//         // 'user[this.attrs.firstName]' retrieves the correct value from the user object
//         [this.attrs.firstName]: user[this.attrs.firstName],
//         [this.attrs.lastName]: user[this.attrs.lastName],
//         [this.attrs.description]: user[this.attrs.description],
//       },
//       relationships: {
//         tasks: {
//           // Use dynamic access for the task IDs
//           data: (user[this.attrs.tasks.key] || []).map((taskId) => ({
//             type: 'task',
//             id: taskId.toString(),
//           })),
//         },
//       },
//     });

//     // Normalize the response based on the request type
//     if (requestType === 'findAll') {
//       // If fetching multiple users, map each user to the desired structure
//       users = payload.users.map(mappedUser);
//     } else if (requestType === 'createRecord') {
//       // If creating a new user, map the single user response
//       const newUser = payload.users;
//       users = mappedUser(newUser);
//     }

//     // Wrap the user(s) data inside the 'data' key as per JSON API spec
//     const serializedData = { data: users };

//     // Call the super method to handle the normalized response properly
//     return super.normalizeResponse(
//       store,
//       primaryModelClass,
//       serializedData,
//       id,
//       requestType,
//     );
//   }

//   /*
//    * This method serializes the user data before sending it to the API.
//    * It ensures that the field names match the expected format by the API,
//    * which is defined in the attrs mapping.
//    */
//   serialize(snapshot, options) {
//     const json = super.serialize(snapshot, options);

//     // Use the attrs mapping to set the correct field names for the API
//     // Snapshot represents the state of a model instance at a specific point in time - ie when its being posted
//     json[this.attrs.firstName] = snapshot.attr('firstName');
//     json[this.attrs.lastName] = snapshot.attr('lastName');
//     json[this.attrs.description] = snapshot.attr('description');

//     return json; // Return the serialized object ready for the API
//   }
// }
