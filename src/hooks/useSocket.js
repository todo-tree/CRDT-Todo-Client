import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Manager } from "socket.io-client";
import db from "../db/db";
import { addTaskSocket, delTaskSocket } from "../db/task";
import useNetwork from "./useNetwork";

const useSocket = () => {
  const managerRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnection, setReconnection] = useState(false);
  const [clientId, setClientId] = useState("");
  const network = useNetwork();

  const getServerData = async () => {
    const lastUpdate = await db.tasks
      .orderBy("_updatedAt")
      .limit(1)
      .reverse()
      .toArray();
    setTimeout(() => {
      axios
        .get(
          `${process.env.API_URI}/get?lastUpdate=${
            lastUpdate[0] ? lastUpdate[0]._updatedAt : 0
          }`
        )
        .then((res) => {
          res.data.CU.map((val) => {
            val._id = val._uid;
            delete val._uid;
            addTaskSocket(val);
          });
          res.data.D.map((val) => {
            db.tasks.delete(val._uid);
          });
        });
    }, 1000);
  };

  useEffect(() => {
    managerRef.current = new Manager(process.env.SOCKET_URI, {
      reconnection: navigator.onLine,
      reconnectionDelay: 10,
    });

    socketRef.current = managerRef.current.socket("/");

    socketRef.current.on("connect", async () => {
      setConnected(true);
      setClientId(socketRef.current.id);
      getServerData();
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
    });

    window.addEventListener("online", () => {
      socketRef.current.connect();
    });

    socketRef.current.on("CU_task", async (task, client_id) => {
      const isAlready = await db.tasks
        .where("_hash")
        .equals(task._hash)
        .toArray();
      if (isAlready.length === 0 && clientId !== client_id) {
        task._id = task._uid;
        delete task._uid;
        addTaskSocket(task);
      }
    });

    socketRef.current.on("D_task", async (deleteId, client_id) => {
      if (clientId !== client_id) {
        delTaskSocket(deleteId);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    managerRef.current.reconnection(network);
    setReconnection(managerRef.current.reconnection());
  }, [network]);

  return [socketRef, connected, reconnection, clientId];
};

export default useSocket;
