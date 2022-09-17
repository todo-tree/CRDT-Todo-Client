import db from "./db";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { syncAdd, syncDelete, syncUpdate } from "./sync";

export const addTaskSocket = async (task) => {
  db.tasks.put(task);
};

export const delTaskSocket = (id) => {
  db.tasks.delete(id);
};

export const create = (title) => {
  if (!(title.trim() === "")) {
    const content = {
      _id: uuidv4(),
      _rev: 0,
      _deleted: false,
      title: title,
      done: false,
      _createdAt: Date.now(),
      _updatedAt: Date.now(),
    };

    const hash = { _hash: md5(JSON.stringify(content)) };

    Object.assign(content, hash);

    db.tasks.add(content);
    syncAdd(content);
  }
};

export const update = async (id, title) => {
  const content = await db.tasks.get(id);

  content.title = title;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  await db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const complete = async (id) => {
  const content = await db.tasks.get(id);

  content.done = !content.done;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  await db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const del = async (task) => {
  if (task._deleted) return;

  const content = await db.tasks.get(task._id);

  content._deleted = true;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const restore = async (task) => {
  if (!task._deleted) return;

  const content = await db.tasks.get(task._id);

  content._deleted = false;
  content._rev++;
  content._updatedAt = Date.now();
  content._hash = md5(JSON.stringify(content));

  db.tasks.update(content._id, content);
  syncUpdate(content);
};

export const cleanTrash = async (task) => {
  if (!task._deleted) return;

  db.tasks.delete(task._id);
  syncDelete(task);
};
