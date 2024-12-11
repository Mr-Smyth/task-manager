export function normalizeTaskToJsonAPIPayload(task) {
  if (!task || !task.id) {
    console.error('Task data is missing or malformed:', task);
    // Return an empty array instead of null
    return { data: [] };
  }

  return {
    data: {
      id: String(task.id),
      type: 'task',
      attributes: {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
      relationships: {
        user: {
          data: task.userId
            ? {
                id: String(task.userId),
                type: 'user',
              }
            : null,
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

export function normalizeAuditLogToJsonAPIPayload(auditLog) {
  // Ensure the required fields exist
  if (!auditLog || !auditLog.id || !auditLog.event_type) {
    console.error('Malformed audit log:', auditLog);
    // Return an empty array to avoid breaking the app
    return { data: [] };
  }

  return {
    data: {
      type: 'audit-log',
      id: auditLog.id,
      attributes: {
        eventType: auditLog.event_type,
        entity: auditLog.entity,
        entityId: auditLog.entity_id,
        description: auditLog.description,
        userId: auditLog.user_id,
        timestamp: auditLog.timestamp,
      },
    },
  };
}

