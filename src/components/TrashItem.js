import React from "react";
import { deleteTaskCommand, restoreTrashTaskCommand } from "../module/commands";
import { v4 } from "uuid";
import db from "../db/db";

const TrashItem = (props) => {
  const { task } = props;

  if (!task._deleted) return;

  const restoreTrash = () => {
    const command = restoreTrashTaskCommand(task._id);
    db.sync.put({ _syncId: v4(), command: command, _applied: 0, _synced: 0 });
  };

  const deleteTask = () => {
    const command = deleteTaskCommand(task._id, task);
    console.log(props);
    db.sync.put({ _syncId: v4(), command: command, _applied: 0, _synced: 0 });
  };

  return (
    <li>
      <span style={{ marginRight: 6, cursor: "pointer" }} onClick={deleteTask}>
        {"🗑️"}
      </span>
      <span style={{ cursor: "pointer" }} onClick={restoreTrash}>
        {"🔙"}{" "}
      </span>
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.title}
      </span>
    </li>
  );
};

export default TrashItem;
