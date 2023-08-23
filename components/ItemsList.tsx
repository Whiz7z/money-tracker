import React, { ReactElement } from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import ItemsListItem from "./ItemsListItem";
import MoveBack from "./navigation/MoveBack";
import { redirect } from "next/navigation";

export interface FilterProps {
  type?: string;
  month?: string;
  year?: string;
  originName?: string;
}

type Props = { searchParams: FilterProps };

const ItemsList = async ({ searchParams }: Props) => {
  const { originName, year, month, type } = searchParams;
  const session = await getServerSession<unknown, any>(authOption);
  const response = await fetch(
    `${process.env.BASE_URL}api/items?type=${type}&month=${month}&year=${year}&originName=${originName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const data = await response.json();

  //console.log(data);

  return (
    <div className="relative self-center w-[640px] h-[726px]">
      <div className="block-shadow-items"></div>
      <div className="absolute grid self-center w-[640px] text-skin-base  bg-[#000] ">
        <div
          className="relative top-[6px] text-skin-basecursor-pointer 
      h-[40px] w-[120px] bg-danger justify-self-start text-skin-ordinary 
               font-medium text-[1.6rem] 
               text-center leading-[4rem] cursor-pointer"
        >
          <MoveBack />
        </div>
        <h2
          className="text-[2.4rem] mt-[50px] self-start justify-self-center "
          style={{
            color: type === "expenses" ? "#c0586b" : "#64aa75",
          }}
        >
          {originName} {type === "expenses" ? "Expenses" : "Incomes"}
        </h2>
        <div
          className="grid grid-cols-[100px_1fr] w-[440px] bg-input h-[40px] mt-[40px]
        justify-self-center text-skin-muted text-[1.6rem] font-regular border-b-[1px] border-b-border"
        >
          <div className="grid items-center">Amount</div>
          <div className="grid items-center justify-self-start ml-[66px]">
            Date
          </div>
        </div>
        <div
          className="justify-self-center
        w-[440px] h-[440px] overflow-y-auto 
       text-skin-ordinary mb-[80px]"
        >
          {data && data.items.length >= 1 ? (
            data.items.map((el) => <ItemsListItem item={el} type={type} />)
          ) : (
            <p className="self-center">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
