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
    `http://localhost:3000/api/${
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
    <div className="flex w-[100%] min-h-[300px] overflow-y-scroll  mb-[5px] justify-center flex-wrap gap-y-[20px] gap-x-[35px] text-[2.6rem] place-content-start">
      {parsedData &&
        parsedData.origins.map((el) => (
          <TypeItem key={el.name} type={el.name} color={el.color}></TypeItem>
        ))}
    </div>
  );
};

export default Types;
