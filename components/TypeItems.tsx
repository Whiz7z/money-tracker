import React from "react";

type Props = {
  type: string;
  color: string;
};
const TypeItems = ({ type, color }: Props) => {
  return (
    <>
      <p
        className={`border-b-4 self-start cursor-pointer `}
        style={{ borderColor: `#${color}` }}
      >
        {type}
      </p>
      <p
        className={`border-b-4 self-start cursor-pointer `}
        style={{ borderColor: `#${color}` }}
      >
        {type}
      </p>
    </>
  );
};

export default TypeItems;
