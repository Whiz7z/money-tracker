import React from "react";
import ListItem from "../ListItem";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import PieChartWrapper from "../UI/PieChartWrapper";
import User from "@/lib/mongo/models/User";
import jwt from "jsonwebtoken";
import connectToDatabase from "./../../lib/mongo/mongoConnect";

export interface FilterProps {
  type?: string;
  month?: string;
  year?: string;
}
type Props = { type: string; searchParams: FilterProps };
interface JwtPayload {
  id: string;
}
const ExpensesList: any = async (props: Props) => {
  const session = await getServerSession<unknown, any>(authOption);
  // console.log("profile session", props.searchParams.type);

  let type;
  let month;
  let year;
  if (!props.searchParams.type) {
    type = "expenses";
  } else {
    type = props.searchParams.type;
  }

  if (!props.searchParams.month && !props.searchParams.year) {
    month = new Date().getMonth();
    year = new Date().getFullYear();
  } else {
    month = props.searchParams.month;
    year = props.searchParams.year;
  }

  console.log("dates", month, year);
  const response = await fetch(
    `http://localhost:3000/api/${type}?month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );
  const data = await response.json();

  const dataChart = data.groupedExpenses.map((el) => {
    return {
      title: el.origin.name,
      label: el.origin.name,
      value: Number(el.amount),
      color: el.origin.color,
    };
  });

  console.log(dataChart);

  const options = {
    title: "My Week Expenses",
    backgroundColor: "transparent",
    color: "#fff",
  };
  return (
    <div className="grid gap-[15px] mt-[33px] h-[350px] overflow-y-scroll bg-transparent p-[10px] rounded-[5px] text-skin-base">
      {/* {type === "expenses" && data.groupedExpenses.length >= 1 ? (
        data.groupedExpenses.map((exp) => (
          <ListItem
            color={exp.origin.color}
            originName={exp.origin.name}
            amount={exp.amount}
            type="expenses"
            date={{ month: month, year: year }}
          />
        ))
      ) : type === "expenses" && data.groupedExpenses.length < 1 ? (
        <p className="self-center">No expense found for this month</p>
      ) : type === "incomes" && data.groupedIncomes.length >= 1 ? (
        data.groupedIncomes.map((exp) => (
          <ListItem
            color={exp.origin.color}
            originName={exp.origin.name}
            amount={exp.amount}
            type="incomes"
            date={{ month: month, year: year }}
          />
        ))
      ) : (
        type === "incomes" &&
        data.groupedIncomes.length < 1 && (
          <p className="self-center">No income found for this month</p>
        )
      )} */}

      <PieChartWrapper data={dataChart} />
    </div>
  );
};

export default ExpensesList;
