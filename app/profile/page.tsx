"use client";
import React, { useState, useEffect } from "react";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOption } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/SignOut";
import MainBlock from "@/components/MainBlock";
import ListSvg from "@/svgComponents/ListSvg";
import ChartSvg from "@/svgComponents/ChartSvg";
import ExpensesList from "@/components/serverComponents/ExpensesList";
import Link from "next/link";

const activeClass = "border-b-4 border-accent";
const Profile = () => {
  const [active, setActive] = useState("expenses");
  const session = useSession(authOption);
  console.log("sessi", session);

  const switchHandler = (classname: string): void => {
    setActive(classname);
  };

  const toAddExpenseHandler = () => {};

  const toAddIncomeHandler = () => {};

  return (
    <>
      {/* <SignOut /> */}

      <div
        className="grid justify-self-center text-skin-base w-[655px]  h-[860px] mt-[70px] 
        outline-1 outline outline-white outline-offset-1"
      >
        {/* BALANSE */}
        <p className="text-[2rem] self-end">Balanse</p>
        <div className="min-w-[165px] grid justify-self-center self-start ">
          <p className="text-[3.2rem] text-skin-good  justify-self-center	self-start">{`$8,653.00`}</p>
          <p className="text-[3.2rem] text-skin-danger justify-self-center self-start	">
            -$2,420.00
          </p>
        </div>
        {/* MONTH */}
        <div
          className="grid min-w-[200px]  max-w-[400px] grid-cols-month gap-[20px] 
            justify-self-center "
        >
          <div
            className="w-[30px] h-[30px] arrow-clip-left bg-accent col-1 self-end 
              relative bottom-[5px]"
          ></div>
          <div className="self-end">
            <p className="text-[2rem] text-skin-accent leading-4	">2023</p>
            <p className="text-[2.8rem] text-skin-accent">May</p>
          </div>
          <div
            className="w-[30px] h-[30px] arrow-clip-right bg-accent col-3 justify-self-end self-end
               relative bottom-[5px]"
          ></div>
        </div>
        {/* EXPENSES/INCOME SWITCH */}
        <div className="max-w-[240px] self-start  grid grid-cols-switch justify-self-center gap-[5px] text-[2.8rem] mt-[25px]">
          <p
            className={`cursor-pointer	text-skin-danger self-start ${
              active === "expenses" && activeClass
            }`}
            onClick={() => switchHandler("expenses")}
          >
            Expenses
          </p>
          <p className="text-skin-accent self-start">/</p>
          <p
            className={`cursor-pointer text-skin-good self-start ${
              active === "incomes" && activeClass
            }`}
            onClick={() => switchHandler("incomes")}
          >
            Income
          </p>
        </div>
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
        <ExpensesList />
        {/* BUTTONS */}
        <div className="w-[480px] grid grid-cols-2 gap-[30px] justify-self-center self-end ">
          <Link
            href="/addIncome"
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
