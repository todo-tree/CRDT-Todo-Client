import db from "../db/db";
import _ from "lodash";

export default (sync) => {
  sync?.map(async (val) => {
    if (val.command.op === "create") {
      db.tasks.put({ ...val.command.oi, _id: val.command.p[0] });
      db.sync.update(val._syncId, {
        ...val,
        _applied: 1,
      });
    } else if (val.command.op === "update") {
      let task = await db.tasks.get(val.command.p[0]);
      console.log(task[val.command.p[1]]);
      if (task[val.command.p[1]] === val.command.ou[0]) {
        task[val.command.p[1]] = val.command.ou[1];
        task._updatedAt = val.command.updatedAt;
        db.tasks.update(val.command.p[0], task);
        db.sync.update(val._syncId, {
          ...val,
          _applied: 1,
        });
      }
    } else if (val.command.op === "delete") {
      let task = await db.tasks.get(val.command.p[0]);

      if (_.isEqual(val.command.od, task)) {
        db.tasks.delete(task._id);
        db.sync.update(val._syncId, {
          ...val,
          _applied: 1,
        });
      }
    }
  });
};
