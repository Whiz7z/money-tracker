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
    `${process.env.BASE_URL}api/${
      props.type === "expenses" ? "expenseOrigins" : "incomeOrigins"
    }`,
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
    <div className="grid w-[440px] justify-self-center mt-[30px] ">
      <div
        className="w-[440px] h-[150px] bg-input justify-self-center pl-[25px] p-[28px] items-center flex overflow-y-scroll  mb-[5px] justify-center 
      flex-wrap gap-y-[10px] gap-x-[35px] text-[1.4rem] 
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
