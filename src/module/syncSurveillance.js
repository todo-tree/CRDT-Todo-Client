import axios from "axios";
import db from "../db/db";

export const sync = (syncTable, network, clientId) => {
  if (syncTable && network) {
    if (syncTable.length !== 0) {
      axios
        .post(`${process.env.API_URI}`, {
          error_messages: false,
          datas: syncTable,
          clientId: clientId,
        })
        .then((res) => {
          res.data.sucsess.map((val) => {
            db.sync.delete(val);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
