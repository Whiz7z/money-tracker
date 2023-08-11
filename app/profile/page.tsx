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
    `${process.env.BASE_URL}api/balanse?month=${month}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
    }
  );

  const balanse = await response.json();
  // if (balanse.expenseBalanse === undefined) {
  //   return <p>Huui</p>;
  // }
  return (
    <>
      {/* <SignOut /> */}

      <div
        className="grid justify-self-center text-skin-ordinary gap-[10px] tablet:gap-[20px]
         w-[300px] tablet:w-[420px] laptop:w-[655px] mt-[0] tablet:mt-[50px] 
        "
      >
        <div className="grid bg-muted p-[20px] rounded-[5px]">
          {/* BALANSE */}
          <p className="text-[2rem] self-end">Balanse</p>
          <div className="min-w-[100%] grid grid-cols-2 justify-self-center self-start ">
            <p className="tablet:text-[2.6rem]  laptop:text-[3.2rem] text-skin-danger justify-self-center self-start	">
              -$
              {balanse.expenseBalanse === undefined
                ? 0
                : balanse.expenseBalanse?.amount}
            </p>
            <p className="tablet:text-[2.6rem]  laptop:text-[3.2rem] text-skin-good  justify-self-center	self-start">
              +$
              {balanse.incomeBalanse === undefined
                ? 0
                : balanse.incomeBalanse?.amount}
            </p>
          </div>
          {/* MONTH */}
          <MonthPicker />

          {/* EXPENSES/INCOME SWITCH */}
          <Switch searchParams={searchParams} />
        </div>
        {/* CHART OR LIST SWITCH */}
        <div className="grid self-start bg-muted p-[20px] rounded-[5px] w-[100%] grid-cols-2 ">
          <div className="justify-self-start">
            <ListSvg w="30px" h="30px" fill="#E49940" />
          </div>
          <div className="justify-self-end">
            <ChartSvg w="30px" h="30px" />
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
          <div className="grid bg-muted p-[20px] rounded-[5px] ">
            <ExpensesList type={type} searchParams={searchParams} />
          </div>
        </Suspense>
        {/* BUTTONS */}
        <div className="grid bg-muted p-[30px] rounded-[5px] ">
          <div className="phone:w-[240px] self-center tablet:w-[380px] grid grid-cols-2 gap-[30px] justify-self-center">
            <Button type={"expense"} />
            <Button type={"income"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
