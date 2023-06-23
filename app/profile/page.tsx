import React from "react";
import { getServerSession } from "next-auth/next";

import { authOption } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/SignOut";
import MainBlock from "@/components/MainBlock";
import MonthPicker from "@/components/MonthPicker";
import ListSvg from "@/svgComponents/ListSvg";
import ChartSvg from "@/svgComponents/ChartSvg";
import ExpensesList from "@/components/serverComponents/ExpensesList";
import Link from "next/link";
import Switch from "@/components/Switch";

const Profile: any = async ({ searchParams }) => {
  const session = await getServerSession<unknown, any>(authOption);
  const toAddExpenseHandler = () => {};

  const toAddIncomeHandler = () => {};
  let type = "expenses";
  const changeType = (t: string) => {
    type = t;
  };

  const response = await fetch(
    "http://localhost:3000/api/balanse?month=6&year=2023",
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
        className="grid justify-self-center text-skin-base w-[655px]  h-[860px] mt-[50px] 
        "
      >
        {/* BALANSE */}
        <p className="text-[2rem] self-end">Balanse</p>
        <div className="min-w-[165px] grid justify-self-center self-start ">
          <p className="text-[3.2rem] text-skin-good  justify-self-center	self-start">
            ${balanse && balanse.incomeBalanse.amount}
          </p>
          <p className="text-[3.2rem] text-skin-danger justify-self-center self-start	">
            -${balanse && balanse.expenseBalanse.amount}
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
        <ExpensesList type={type} searchParams={searchParams} />
        {/* BUTTONS */}
        <div className="w-[480px] grid grid-cols-2 gap-[30px] justify-self-center self-end ">
          <Link
            href="/profile/addIncome"
            className="inline-block w-[220px] h-[60px] justify-self-end
               bg-accent rounded-[15px] font-bold text-[2.8rem] text-skin-muted text-center leading-[6rem]	"
          >
            + income
          </Link>
          <Link
            href="/profile/addExpense"
            className="inline-block w-[220px] h-[60px] justify-self-start
               bg-muted rounded-[15px] font-bold text-[2.8rem] text-center leading-[6rem]"
          >
            + expense
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
