import React from "react";

const CategoryTitle = (props) => {
  const { title } = props;
  return (
    <h3
      style={{
        marginTop: 15,
        marginLeft: 40,
      }}
    >
      {title}
    </h3>
  );
};

export default CategoryTitle;
