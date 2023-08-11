import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

import TypeItem from "../TypeItem";

import connectToDatabase from "@/lib/mongo/mongoConnect";

type Props = {
  type: string;
};
interface JwtPayload {
  id: string;
}

const Types: any = async (props: Props) => {
  const session = await getServerSession<unknown, any>(authOption);
  console.log("session", session);

  const data = await fetch(
    `/api/${props.type === "expenses" ? "expenseOrigins" : "incomeOrigins"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: "no-cache",
    }
  );

  const parsedData = await data.json();

  return (
    <div className="grid bg-muted p-[20px] rounded-[5px] my-[20px] tiny:w-[300px] tablet:w-[400px] laptop:w-[100%] ">
      <div
        className="justify-self-center pl-[25px] pr-[15px] items-center flex overflow-y-scroll  mb-[5px] justify-center 
      flex-wrap gap-y-[20px] gap-x-[35px] text-[1.8rem] tablet:text-[2.2rem] laptop:text-[2.6rem] 
      place-content-center"
      >
        {parsedData &&
          parsedData.origins.map((el) => (
            <TypeItem
              key={el.name}
              type={el.name}
              color={el.color}
              recordType={props.type}
            ></TypeItem>
          ))}
      </div>
    </div>
  );
};

export default Types;
