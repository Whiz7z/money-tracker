"use client";
import React from "react";
import Link from "next/link";

type Props = {
  color: string;
  amount: number;
  originName: string;
  date: { month: any; year: any };
  type: string;
};

const ListItem = ({ color, amount, originName, date, type }: Props) => {
  return (
    <Link
      href={`/items?month=${date.month}&year=${date.year}&type=${type}&originName=${originName}`}
      className="grid grid-cols-listItem h-[45px] cursor-pointer
       hover:bg-neutral-950  pl-[10px]"
    >
      <div
        className={`w-[100px] h-[30px] self-center`}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="justify-self-start self-center text-[2.8rem]">
        {originName}
      </div>
      <div className="text-[2.8rem] self-center mr-[10px]">${amount}</div>
    </Link>
  );
};

export default ListItem;
