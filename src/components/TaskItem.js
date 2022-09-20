import React, { useEffect, useState } from "react";
import {
  moveTrashTaskCommand,
  toggleDoneTaskCommand,
  updateTaskCommand,
} from "../module/createLog";
import db from "../db/db";
import { v4 } from "uuid";

const TaskItem = (props) => {
  const { task } = props;
  const [editting, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task, editting]);

  const toggleDoneTask = () => {
    const command = toggleDoneTaskCommand(task._id, task.done);
    db.sync.put({ _syncId: v4(), command: command, _applied: 0, _synced: 0 });
  };

  const moveTrashTask = () => {
    const command = moveTrashTaskCommand(task._id);
    db.sync.put({ _syncId: v4(), command: command, _applied: 0, _synced: 0 });
  };

  const updateTask = () => {
    const command = updateTaskCommand(task._id, "title", task.title, title);
    db.sync.put({ _syncId: v4(), command: command, _applied: 0, _synced: 0 });
  };

  if (task._deleted) return;
  return (
    <li>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={moveTrashTask}
      >
        {"🗑️"}
      </span>
      <span
        style={{ marginRight: 6, cursor: "pointer" }}
        onClick={() => setEditing(true)}
      >
        {"🖊️"}
      </span>
      <span
        onClick={toggleDoneTask}
        style={{
          cursor: "pointer",
        }}
      >
        {task && task.done ? "👌" : "👋"}{" "}
      </span>
      {!editting ? (
        <span style={task.done ? { textDecoration: "line-through" } : {}}>
          {task.title}
        </span>
      ) : (
        <div style={{ display: "inline" }}>
          <input
            style={{ display: "inline", width: 200 }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (!(title.trim() === "")) {
                  updateTask();
                }
                setEditing(false);
              }
            }}
          />
          <button
            style={{ display: "inline" }}
            onClick={() => {
              setEditing(false);
              setTitle(task.title);
            }}
          >
            Cancel
          </button>
          <button
            style={{ display: "inline" }}
            onClick={() => {
              if (!(title.trim() === "")) {
                updateTask();
              }
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
