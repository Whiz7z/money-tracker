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
  display?: string;
}
type Props = { type: string; searchParams: FilterProps };
interface JwtPayload {
  id: string;
}
const ExpensesList: any = async (props: Props) => {
  const { display } = props.searchParams;
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
    `${process.env.BASE_URL}api/${type}?month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );
  //console.log("data data", response);
  const data = response.ok ? await response.json() : undefined;

  const dataChart =
    data && type === "incomes"
      ? data.groupedIncomes.map((el) => {
          return {
            title: el.origin.name,
            label: el.origin.name,
            value: Number(el.amount),
            color: el.origin.color,
          };
        })
      : data &&
        data.groupedExpenses.map((el) => {
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

  if (display === "chart") {
    return (
      <div
        className="grid gap-[15px] max-h-[280px] overflow-y-scroll 
      bg-transparent p-[10px] rounded-[5px] text-skin-ordinary"
      >
        <PieChartWrapper data={dataChart} />
      </div>
    );
  }

  if (display === "list") {
    return (
      <div
        className="phone:w-[280px] tablet:w-[340px] laptop:w-[440px] justify-self-center 
      bg-transparent text-skin-ordinary h-[260px] "
      >
        <div
          className="grid grid-cols-[75px_1fr_100px] phone:w-[280px] tablet:w-[340px] laptop:w-[440px] bg-input h-[40px] 
        justify-self-center text-skin-muted  font-regular border-b-[1px] border-b-border tiny:text-[1.2rem] laptop:text-[1.6rem]"
        >
          <div className="grid items-center tiny:text-[1.2rem] laptop:text-[1.6rem]">
            Color
          </div>
          <div className="grid items-center justify-self-start ml-[40px] tiny:text-[1.2rem] laptop:text-[1.6rem]">
            Origin type
          </div>
          <div className="grid items-center tiny:text-[1.2rem] laptop:text-[1.6rem]">
            Amount
          </div>
        </div>
        <div className=" h-[240px] overflow-y-auto overflow-x-hidden">
          {type === "expenses" && data && data.groupedExpenses.length >= 1 ? (
            data.groupedExpenses.map((exp) => (
              <ListItem
                key={exp.origin.id}
                color={exp.origin.color}
                originName={exp.origin.name}
                amount={exp.amount}
                type="expenses"
                date={{ month: month, year: year }}
              />
            ))
          ) : type === "expenses" && data && data.groupedExpenses.length < 1 ? (
            <p className="self-center mt-[100px] text-skin-muted  tiny:text-[1.4rem] tablet:text-[1.8rem] laptop:text-[2.2rem]">
              No expense found for this month
            </p>
          ) : type === "incomes" && data && data.groupedIncomes.length >= 1 ? (
            data.groupedIncomes.map((exp) => (
              <ListItem
                key={exp.origin.id}
                color={exp.origin.color}
                originName={exp.origin.name}
                amount={exp.amount}
                type="incomes"
                date={{ month: month, year: year }}
              />
            ))
          ) : (
            type === "incomes" &&
            data &&
            data.groupedIncomes.length < 1 && (
              <p className="self-center mt-[100px] text-skin-muted tiny:text-[1.4rem] tablet:text-[1.8rem] laptop:text-[2.2rem]">
                No income found for this month
              </p>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="phone:w-[280px] tablet:w-[340px] laptop:w-[440px] justify-self-center gap-[15px] h-[260px]
    bg-transparent rounded-[5px] text-skin-ordinary"
    >
      <div
        className="grid grid-cols-[75px_1fr_60px] phone:w-[280px] tablet:w-[340px] laptop:w-[440px] bg-input h-[40px] 
        justify-self-center text-skin-muted text-[1.6rem] font-regular border-b-[1px] border-b-border tiny:text-[1.2rem] laptop:text-[1.6rem]"
      >
        <div className="grid items-center">Color</div>
        <div className="grid items-center justify-self-start ml-[30px]">
          Origin type
        </div>
        <div className="grid items-center">Amount</div>
      </div>

      <div className=" h-[240px] overflow-y-auto overflow-x-hidden">
        {type === "expenses" && data && data.groupedExpenses.length >= 1 ? (
          data.groupedExpenses.map((exp) => (
            <ListItem
              color={exp.origin.color}
              originName={exp.origin.name}
              amount={exp.amount}
              type="expenses"
              date={{ month: month, year: year }}
            />
          ))
        ) : type === "expenses" && data && data.groupedExpenses.length < 1 ? (
          <p className="self-center mt-[100px] text-skin-muted tiny:text-[1.4rem] tablet:text-[1.8rem] laptop:text-[2.2rem]">
            No expense found for this month
          </p>
        ) : type === "expenses" && !data ? (
          <p className="self-center mt-[100px] text-skin-muted tiny:text-[1.4rem] tablet:text-[1.8rem] laptop:text-[2.2rem]">
            No expense found for this month
          </p>
        ) : type === "incomes" && data && data.groupedIncomes.length >= 1 ? (
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
          (type === "incomes" || type === "expenses") &&
          data &&
          data.groupedIncomes.length < 1 && (
            <p className="self-center mt-[100px] text-skin-muted tiny:text-[1.4rem] tablet:text-[1.8rem] laptop:text-[2.2rem]">
              No income found for this month
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ExpensesList;
