import db from "../db/db";
import _ from "lodash";

const applied = (val) => {
  db.sync.update(val._syncId, {
    ...val,
    _applied: 1,
  });
};

export default (sync) => {
  sync?.map(async (val) => {
    let task = await db.tasks.get(val.command.p[0]);

    switch (val.command.op) {
      case "create":
        db.tasks.put({ ...val.command.oi, _id: val.command.p[0] });
        applied(val);
        break;

      case "update":
        if (task[val.command.p[1]] === val.command.ou[0]) {
          task[val.command.p[1]] = val.command.ou[1];
          task._updatedAt = val.command.updatedAt;
          db.tasks.update(val.command.p[0], task);
          applied(val);
        }
        break;

      case "delete":
        if (_.isEqual(val.command.od, task)) {
          db.tasks.delete(task._id);
          applied(val);
        }
    }
  });
};
