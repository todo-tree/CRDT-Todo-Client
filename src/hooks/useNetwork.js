import { useState, useEffect } from "react";

const useNetwork = () => {
  const [network, setNetwork] = useState(false);

  useEffect(() => {
    setNetwork(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setNetwork(true);
  });

  window.addEventListener("offline", () => {
    setNetwork(false);
  });

  return network;
};

export default useNetwork;
