import { v4 } from "uuid";

export const createTaskCommand = (title) => {
  let command = { op: "", p: [], oi: {} };
  command.op = "create";
  command.p.push(v4());
  command.oi = {
    title: title,
    _deleted: false,
    _createdAt: Date.now(),
    _updatedAt: Date.now(),
  };

  return command;
};

export const update = (path, before, after) => {
  return { op: "update", p: path, ou: [before, after] };
};

export const moveTrashTaskCommand = (task_id) => {
  let command = { op: "", p: [], ou: [] };
  command.op = "update";
  command.p.push(task_id, "_deleted");
  command.ou.push(false, true);

  return command;
};

export const del = (path, deleteTaskObject) => {
  return { op: "delete", p: path, od: deleteTaskObject };
};
