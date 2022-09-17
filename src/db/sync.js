import db from "./db";
import { v4 as uuidv4 } from "uuid";

export const syncAdd = (content) => {
  Object.assign(content, {
    type: "create",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};

export const syncUpdate = (content) => {
  Object.assign(content, {
    type: "update",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};

export const syncDelete = (content) => {
  Object.assign(content, {
    type: "delete",
    sync_id: uuidv4(),
  });
  db.sync.add(content);
};
