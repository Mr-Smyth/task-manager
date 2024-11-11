// app/utils/normalize-to-json-api.js

export function normalizeTaskToJsonAPIPayload(task) {
  return {
    data: {
      id: String(task.id),
      type: 'task',
      attributes: {
        title: task.title,
        description: task.description,
      },
    },
  };
}

export function normalizeUserToJsonAPIPayload(user) {
  return {
    data: {
      id: String(user.id),
      type: 'user',
      attributes: {
        firstName: user.first_name,
        lastName: user.last_name,
        description: user.description,
      },
    },
  };
}
