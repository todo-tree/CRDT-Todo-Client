import React, { useState } from "react";
import db from "../db/db";
import { createTaskCommand } from "../module/createLog";

const Inputs = () => {
  const [data, setData] = useState("");

  const createTask = () => {
    const command = createTaskCommand(data);
    console.log(command);

    db.tasks.put({ ...command.oi, _id: command.p[0] });

    setData("");
  };

  return (
    <div>
      <input
        style={{
          marginTop: 15,
          marginLeft: 40,
        }}
        placeholder="task-title"
        onChange={(e) => setData(e.target.value)}
        value={data}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            createTask();
          }
        }}
      />
      <button onClick={createTask}>Create</button>
    </div>
  );
};

export default Inputs;
