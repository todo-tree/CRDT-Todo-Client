import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./db/db";
import Inputs from "./components/Inputs";
import TaskItem from "./components/TaskItem";
import Order from "./components/Order";
import Status from "./components/status";
import TrashItem from "./components/TrashItem";
import CategoryTitle from "./components/CategoryTitle";

const App = () => {
  const [order, setOrder] = useState("create+");

  const tasks = useLiveQuery(() => {
    const task = db.tasks.orderBy(
      order.slice(0, -1) === "update" ? "_updatedAt" : "_createdAt"
    );
    return order.slice(-1) === "-" ? task.reverse().toArray() : task.toArray();
  }, [order]);

  const sync = useLiveQuery(() => {
    return db.sync.where("_applied").equals(0).toArray();
  });

  useEffect(() => {
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
        task[val.command.p[1]] =
          task[val.command.p[1]] === val.command.ou[0]
            ? val.command.ou[1]
            : task[val.command.p[1]];
        db.tasks.update(val.command.p[0], task);
        db.sync.update(val._syncId, {
          ...val,
          _applied: 1,
        });
      }
    });
  }, [sync]);

  return (
    <div>
      <Inputs />
      <Order order={order} setOrder={setOrder} />
      <Status />

      <CategoryTitle title="Tasks" />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val) => {
              return <TaskItem task={val} key={val._id} />;
            })
          : null}
      </ul>

      <CategoryTitle title="Trash" />
      <ul style={{ listStyle: "none" }}>
        {tasks
          ? tasks.map((val) => {
              return <TrashItem task={val} key={val._id} />;
            })
          : null}
      </ul>
    </div>
  );
};

export default App;
