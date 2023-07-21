import React from "react";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { authOption } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/SignOut";
import MainBlock from "@/components/MainBlock";
import MonthPicker from "@/components/MonthPicker";
import ListSvg from "@/svgComponents/ListSvg";
import ChartSvg from "@/svgComponents/ChartSvg";
import ExpensesList from "@/components/serverComponents/ExpensesList";
import Link from "next/link";
import Switch from "@/components/Switch";
import Button from "@/components/UI/Button";

const Profile: any = async ({ searchParams }) => {
  const session = await getServerSession<unknown, any>(authOption);
  const toAddExpenseHandler = () => {};

  const toAddIncomeHandler = () => {};
  let type = "expenses";
  const changeType = (t: string) => {
    type = t;
  };
  let month;
  let year;
  if (!searchParams.month && !searchParams.year) {
    month = new Date().getMonth();
    year = new Date().getFullYear();
  } else {
    month = searchParams.month;
    year = searchParams.year;
  }

  const response = await fetch(
    `http://localhost:3000/api/balanse?month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const balanse = await response.json();
  return (
    <>
      {/* <SignOut /> */}

      <div
        className="grid justify-self-center text-skin-ordinary w-[655px]  h-[860px] mt-[50px] 
        "
      >
        {/* BALANSE */}
        <p className="text-[2rem] self-end">Balanse</p>
        <div className="min-w-[165px] grid justify-self-center self-start ">
          <p className="text-[3.2rem] text-skin-good  justify-self-center	self-start">
            +$
            {balanse && balanse.incomeBalanse
              ? balanse.incomeBalanse.amount
              : 0}
          </p>
          <p className="text-[3.2rem] text-skin-danger justify-self-center self-start	">
            -$
            {balanse && balanse.expenseBalanse
              ? balanse.expenseBalanse.amount
              : 0}
          </p>
        </div>
        {/* MONTH */}
        <MonthPicker />

        {/* EXPENSES/INCOME SWITCH */}
        <Switch searchParams={searchParams} />
        {/* CHART OR LIST SWITCH */}
        <div className="grid self-start  w-[100%] grid-cols-2 mt-[20px]">
          <div className="justify-self-start">
            <ListSvg w="45px" h="45px" fill="#E49940" />
          </div>
          <div className="justify-self-end">
            <ChartSvg w="45px" h="45px" />
          </div>
        </div>
        {/* LIST */}
        <Suspense
          fallback={
            <div
              className="grid gap-[15px] mt-[33px] h-[250px] 
            overflow-y-scroll bg-muted p-[10px]"
            >
              <p className="self-center">Loading</p>
            </div>
          }
        >
          <ExpensesList type={type} searchParams={searchParams} />
        </Suspense>
        {/* BUTTONS */}
        <div className="w-[480px] grid grid-cols-2 gap-[30px] justify-self-center self-end ">
          {/* <Link
            href="/profile/addIncome"
            className="inline-block w-[220px] h-[60px] justify-self-end
               bg-accent rounded-[15px] font-bold text-[2.8rem] text-skin-dark text-center leading-[6rem]	"
          >
            + income
          </Link> */}
          <Button type={"expense"} />
          <Button type={"income"} />
          {/* <Link
            href="/profile/addExpense"
            className="inline-block w-[220px] h-[60px] justify-self-start
               bg-muted rounded-[15px] font-bold text-[2.8rem] text-center leading-[6rem]"
          >
            + expense
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
