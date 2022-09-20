import React, { useState } from "react";
import { v4 } from "uuid";
import db from "../db/db";
import { createTaskCommand } from "../module/commands";

const Inputs = () => {
  const [data, setData] = useState("");

  const createTask = () => {
    const command = createTaskCommand(data);

    db.sync.put({
      _syncId: v4(),
      command: command,
      _applied: 0,
      _synced: 0,
    });

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
