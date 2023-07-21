import React, { ReactElement } from "react";
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
    `http://localhost:3000/api/items?type=${type}&month=${month}&year=${year}&originName=${originName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const data = await response.json();

  console.log(data.items[0]._id);
  return (
    <div className="grid  w-[655px] text-skin-base h-[860px] mt-[70px]">
      <h2
        className=" text-[3.2rem] self-start justify-self-center"
        style={{
          color: type === "expenses" ? "#ea4335" : "#86bc34",
          borderBottom: `solid 4px ${data.items[0].origin.color}`,
        }}
      >
        {originName} {type === "expenses" ? "Expenses" : "Incomes"}
      </h2>
      <div
        className="grid grid-rows-[max-content]  justify-self-center
       mt-[33px] w-[100%] h-[550px] overflow-y-auto
       bg-muted  
       text-skin-ordinary"
      >
        {data &&
          data.items.length >= 1 &&
          data.items.map((el) => <ItemsListItem item={el} type={type} />)}
      </div>
    </div>
  );
};

export default ItemsList;
