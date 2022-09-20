import { v4 } from "uuid";

export const createTaskCommand = (title) => {
  let command = { op: "", p: [], oi: {} };
  command.op = "create";
  command.p.push(v4());
  command.oi = {
    title: title,
    done: false,
    _deleted: false,
    _createdAt: Date.now(),
    _updatedAt: Date.now(),
  };

  return command;
};

export const toggleDoneTaskCommand = (task_id, done) => {
  let command = { op: "", p: [], ou: [], updatedAt: 0 };
  command.op = "update";
  command.p.push(task_id, "done");
  command.ou.push(done, !done);
  command.updatedAt = Date.now();
  return command;
};

export const moveTrashTaskCommand = (task_id) => {
  let command = { op: "", p: [], ou: [] };
  command.op = "update";
  command.p.push(task_id, "_deleted");
  command.ou.push(false, true);
  return command;
};

export const restoreTrashTaskCommand = (task_id) => {
  let command = { op: "", p: [], ou: [] };
  command.op = "update";
  command.p.push(task_id, "_deleted");
  command.ou.push(true, false);
  return command;
};

export const del = (path, deleteTaskObject) => {
  return { op: "delete", p: path, od: deleteTaskObject };
};
