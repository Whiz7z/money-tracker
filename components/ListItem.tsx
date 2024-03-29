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
      className={`grid laptop:grid-cols-[75px_1fr_100px] phone:grid-cols-[75px_1fr_60px] h-[40px] cursor-pointer p-[0] m-[0]
       hover:bg-input border-b-[1px] border-b-border tiny:text-[1.2rem] laptop:text-[1.6rem] bg-item ${
         type === "expenses" ? "text-skin-danger" : "text-skin-good"
       } `}
    >
      <div
        className={`w-[100%] h-[100%] self-center`}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="justify-self-start self-center laptop:ml-[30px] tiny:ml-[25px]">
        {originName}
      </div>
      <div className="grid self-center tiny:mr-[15px] laptop:mr-[20px] justify-self-end">
        ${amount}
      </div>
    </Link>
  );
};

export default ListItem;
