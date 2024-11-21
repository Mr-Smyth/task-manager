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
      relationships: {
        user: {
          data: task.userId
            ? {
                id: String(task.userId),
                type: 'user',
              }
            : null, // For cases where the task is unassigned
        },
      },
    },
  };
}

export function normalizeUserToJsonAPIPayload(user) {
  // Ensure taskIds is an array, default to an empty array if null or not an array
  const taskIds = Array.isArray(user.taskIds) ? user.taskIds : [];

  return {
    data: {
      id: String(user.id),
      type: 'user',
      attributes: {
        firstName: user.first_name,
        lastName: user.last_name,
        description: user.description,
      },
      relationships: {
        tasks: {
          data: taskIds.map((taskId) => ({
            id: String(taskId),
            type: 'task',
          })),
        },
      },
    },
  };
}
