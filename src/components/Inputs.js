import React, { useState } from "react";
import { create } from "../db/task";

const Inputs = () => {
  const [data, setData] = useState("");

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
            create(data);
            setData("");
          }
        }}
      />
      <button
        onClick={() => {
          create(data);
          setData("");
        }}
      >
        Create
      </button>
    </div>
  );
};

export default Inputs;
