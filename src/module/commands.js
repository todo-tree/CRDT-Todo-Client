import { v4 } from "uuid";

export const createTaskCommand = (title) => {
  return {
    op: "create",
    p: [v4()],
    oi: {
      title: title,
      done: false,
      _deleted: false,
      _createdAt: Date.now(),
      _updatedAt: Date.now(),
    },
  };
};

export const toggleDoneTaskCommand = (task_id, done) => {
  return {
    op: "update",
    p: [task_id, "done"],
    ou: [done, !done],
    updatedAt: Date.now(),
  };
};

export const moveTrashTaskCommand = (task_id) => {
  return {
    op: "update",
    p: [task_id, "_deleted"],
    ou: [false, true],
    updatedAt: Date.now(),
  };
};

export const restoreTrashTaskCommand = (task_id) => {
  return {
    op: "update",
    p: [task_id, "_deleted"],
    ou: [true, false],
    updatedAt: Date.now(),
  };
};

export const updateTaskCommand = (task_id, item_name, before, after) => {
  return {
    op: "update",
    p: [task_id, item_name],
    ou: [before, after],
    updatedAt: Date.now(),
  };
};

export const deleteTaskCommand = (task_id, taskObject) => {
  return { op: "delete", p: [task_id], od: taskObject };
};
