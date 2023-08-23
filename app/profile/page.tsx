import React from "react";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { authOption } from "../api/auth/[...nextauth]/route";
import LogOutBtn from "@/components/LogOutBtn";
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
      <div className="relative self-center w-[640px] h-[820px]">
        <div className="block-shadow-profile"></div>
        <div
          className="absolute grid justify-self-center text-skin-ordinary 
         w-[640px] h-[820px] bg-[#000]
        "
        >
          <LogOutBtn />
          <div className="grid mt-[40px] h-[180px] rounded-[5px]">
            {/* BALANSE */}
            <p className="text-[2.4rem] self-end text-skin-good font-regular">
              Hi, Yevhen
            </p>

            <MonthPicker />

            {/* EXPENSES/INCOME SWITCH */}
            <Switch searchParams={searchParams} />

            {/* MONTH */}
          </div>
          {/* CHART OR LIST SWITCH */}
          <div className="grid self-start mt-[5px] w-[440px] h-[40px] justify-self-center grid-cols-2 ">
            <div className="justify-self-start">
              <ListSvg w="30px" h="30px" fill="#64aa75" />
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
            overflow-y-scroll  p-[10px]"
              >
                <p className="self-center">Loading</p>
              </div>
            }
          >
            <ExpensesList type={type} searchParams={searchParams} />
          </Suspense>

          {/* BUTTONS */}
          <div className="grid w-[440px] h-[255px] justify-self-center">
            <div className="w-[440px] flex justify-self-center justify-between items-center">
              <Button type={"income"} />
              <Button type={"expense"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
