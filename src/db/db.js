import Dexie from "dexie";

const db = new Dexie("t-tree-db");

db.version(1).stores({
  tasks: "_id, title, done, _deleted, _createdAt, _updatedAt",
  sync: "_syncId, command, _applied, _confirmed",
});

export default db;
