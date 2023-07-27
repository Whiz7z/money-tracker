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
       hover:bg-semitransparent  pl-[10px] rounded-[5px] gap-[20px]"
    >
      <div
        className={`w-[40px] tablet:w-[70px] laptop:w-[100px] h-[30px] self-center`}
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="justify-self-start self-center text-[1.2rem] laptop:text-[2.8rem] tablet:text-[2rem]">
        {originName}
      </div>
      <div className="laptop:text-[2.8rem] text-[1.2rem]  tablet:text-[2rem] self-center mr-[10px]">
        ${amount}
      </div>
    </Link>
  );
};

export default ListItem;
