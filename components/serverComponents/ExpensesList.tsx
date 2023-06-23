import React from "react";
import ListItem from "../ListItem";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

import User from "@/lib/mongo/models/User";
import jwt from "jsonwebtoken";
import connectToDatabase from "./../../lib/mongo/mongoConnect";

export interface FilterProps {
  type?: string;
}
type Props = { type: string; searchParams: FilterProps };
interface JwtPayload {
  id: string;
}
const ExpensesList: any = async (props: Props) => {
  const session = await getServerSession<unknown, any>(authOption);
  // console.log("profile session", props.searchParams.type);
  let type;
  if (!props.searchParams.type) {
    type = "expenses";
  } else {
    type = props.searchParams.type;
  }
  console.log(props.searchParams.type);
  const response = await fetch(`http://localhost:3000/api/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.token}`,
    },
  });
  const data = await response.json();
  // } else {
  //   response = await fetch(`http://localhost:3000/api/incomes}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.user.token}`,
  //     },
  //   });
  //   data = await response.json();
  // }
  // await fetch(
  //   `http://localhost:3000/api/${props.searchParams?.type && "expenses"}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session.user.token}`,
  //     },
  //   }
  // );

  //console.log("data", data);
  // const decoded = jwt.verify(
  //   session.user.token,
  //   process.env.JWT_SECRET
  // ) as JwtPayload;
  // const user = await User.findById(decoded.id);

  // console.log(user);
  // let data = [];
  // if (props.searchParams?.type === "expenses") {
  //   data = user.expenses;
  // } else if (props.searchParams?.type === "incomes") {
  //   data = user.incomes;
  // } else {
  //   data = user.expenses;
  // }

  return (
    <div className="grid gap-[15px] mt-[33px] h-[250px] overflow-y-scroll">
      {/* <p>{props.type}</p> */}
      {type === "expenses"
        ? data.groupedExpenses.map((exp) => (
            <ListItem
              color={exp.origin.color}
              type={exp.origin.name}
              amount={exp.amount}
            />
          ))
        : data.groupedIncomes.map((exp) => (
            <ListItem
              color={exp.origin.color}
              type={exp.origin.name}
              amount={exp.amount}
            />
          ))}
      {/* <ListItem color="c7dc7d" type="Food" amount={235.45} />
      <ListItem color="40e482" type="Car" amount={175.0} />
      <ListItem color="84a6b0" type="Sigarets" amount={85.5} />
      <ListItem color="6f1a07" type="Entertaiment" amount={120.0} />
      <ListItem color="84a6b0" type="Alcohol" amount={55.5} />
      <ListItem color="6f1a07" type="City transport" amount={85.35} /> */}
    </div>
  );
};

export default ExpensesList;
