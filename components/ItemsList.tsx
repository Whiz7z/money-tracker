import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import ItemsListItem from "./ItemsListItem";

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
    `http://localhost:3000/api/getItems?type=${type}&month=${month}&year=${year}&originName=${originName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const data = await response.json();

  console.log(data.items);
  return (
    <div className="grid text-skin-base w-[655px]  h-[860px] mt-[70px]">
      <h2
        className=" text-[3.2rem] self-start justify-self-center"
        style={{
          color: type === "expenses" ? "#ea4335" : "40e482",
          borderBottom: `solid 4px ${data.items[0].origin.color}`,
        }}
      >
        {originName} {type === "expenses" ? "Expenses" : "Incomes"}
      </h2>
      <div className="grid gap-[15px] mt-[33px] h-[250px] overflow-y-scroll bg-neutral-900 p-[10px] rounded-[5px]">
        {data &&
          data.items.length >= 1 &&
          data.items.map((el) => <ItemsListItem item={el} type={type} />)}
      </div>
    </div>
  );
};

export default ItemsList;
