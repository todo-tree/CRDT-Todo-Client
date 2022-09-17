import Dexie from "dexie";

const db = new Dexie("t-tree-db");

db.version(1).stores({
  tasks: "_id, title, done, _hash, _rev, _deleted, _createdAt, _updatedAt",
  sync: "sync_id, type, _id, title, done, _hash, _rev, _deleted, _createdAt, _updatedAt, _changedAt",
});

export default db;
