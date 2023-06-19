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
// const fetchOrigins = async (session: any) => {
//   const data = await fetch("http://localhost:3000/api/expenseOrigins", {
//     method: "POST",
//     body: JSON.stringify({
//       session: session,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log(data);
//   return await data.json();
// };

const Types: any = async (props: Props) => {
  const session = await getServerSession(authOption);
  console.log("session", session);

  const data = await fetch("http://localhost:3000/api/expenseOrigins", {
    method: "PATCH",
    body: JSON.stringify({
      session: session,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  //console.log("data", data);

  const parsedData = await data.json();

  console.log("parsedData", parsedData);

  return (
    <div className="flex w-[100%] justify-center flex-wrap gap-y-[20px] gap-x-[35px] text-[2.6rem] place-content-start">
      {parsedData &&
        parsedData.expenseOrigins.map((el) => (
          <TypeItem key={el.name} type={el.name} color={el.color}></TypeItem>
        ))}
    </div>
  );
};

export default Types;
