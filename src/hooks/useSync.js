import { useState, useEffect } from "react";
import db from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const useSync = () => {
  const [synced, setSynced] = useState(false);
  const syncCount = useLiveQuery(() => db.sync.count());

  useEffect(() => {
    setSynced(syncCount === 0 ? true : false);
  }, [syncCount]);

  return synced;
};

export default useSync;
