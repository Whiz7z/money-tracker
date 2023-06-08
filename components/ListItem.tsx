"use client";
import React from "react";

type Props = {
  color: string;
  type: string;
  amount: number;
};

const ListItem = ({ color, type, amount }: Props) => {
  let classStyle = `w-[100px] h-[30px] bg-[#${color}]`;
  return (
    <div className="grid grid-cols-listItem">
      <div
        className={`w-[100px] h-[30px]`}
        style={{ backgroundColor: `#${color}` }}
      ></div>
      <div className="justify-self-start text-[2.8rem]">{type}</div>
      <div className="text-[2.8rem] mr-[10px]">${amount}</div>
    </div>
  );
};

export default ListItem;
