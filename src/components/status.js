import React from "react";
import useNetwork from "../hooks/useNetwork";

const Status = () => {
  const network = useNetwork();

  return (
    <div
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
    >
      <p>NetWork: {network ? "Online" : "Offline"}</p>
      <p>ENV(AA): {process.env.AA}</p>
    </div>
  );
};

export default Status;
