import { useEffect, useRef } from "react";
import { Manager } from "socket.io-client";
import useNetwork from "./useNetwork";

const useSocket = () => {
  const managerRef = useRef(null);
  const socketRef = useRef(null);
  const network = useNetwork();

  useEffect(() => {
    managerRef.current = new Manager(process.env.SOCKET_URI, {
      reconnection: navigator.onLine,
      reconnectionDelay: 10,
    });

    socketRef.current = managerRef.current.socket("/");

    window.addEventListener("online", () => {
      socketRef.current.connect();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    managerRef.current.reconnection(network);
  }, [network]);

  return [socketRef];
};

export default useSocket;
