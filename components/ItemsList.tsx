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

  //console.log(data);

  return (
    <div className="grid gap-[20px] w-[300px] laptop:w-[655px] tablet:w-[420px] text-skin-base h-[auto] ">
      <h2
        className=" text-[2.2rem] tablet:text-[2.6rem] 
        laptop:text-[3.2rem] self-start justify-self-center bg-muted p-[20px] rounded-[5px] "
        style={{
          color: type === "expenses" ? "#ea4335" : "#86bc34",
          borderBottom: `solid 4px ${
            data && data.items.length >= 1 && data.items[0].origin.color
          }`,
        }}
      >
        {originName} {type === "expenses" ? "Expenses" : "Incomes"}
      </h2>
      <div
        className="grid grid-rows-[max-content]  justify-self-center
        w-[100%] overflow-y-auto
      bg-muted p-[20px] rounded-[5px] 
       text-skin-ordinary"
      >
        {data && data.items.length >= 1 ? (
          data.items.map((el) => <ItemsListItem item={el} type={type} />)
        ) : (
          <p className="self-center">No items found</p>
        )}
      </div>
    </div>
  );
};

export default ItemsList;
