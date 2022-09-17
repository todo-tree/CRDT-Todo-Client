import React from "react";

const Order = (props) => {
  const { order, setOrder } = props;

  return (
    <select
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
      onChange={(e) => setOrder(e.target.value)}
      value={order}
    >
      <option value="create+">Date Created: New→Old</option>
      <option value="create-">Date Created: Old→New</option>
      <option value="update-">Date Updated: New→Old</option>
      <option value="update+">Date Updated: Old→New</option>
    </select>
  );
};

export default Order;
