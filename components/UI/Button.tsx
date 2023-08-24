"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  type: string;
  balanse: string;
};

const Button = ({ type, balanse }: Props) => {
  const [isLoadingIncome, setIsLoadingIncome] = useState(false);
  const [isLoadingExpense, setIsLoadingExpense] = useState(false);

  const setLoadingIncomeHandler = () => {
    console.log("loading");
    setIsLoadingIncome(true);
  };

  const setLoadingExpenseHandler = () => {
    console.log("loading");
    setIsLoadingExpense(true);
  };
  // href = "/profile/addIncome";
  if (type === "income") {
    return (
      <div
        onClick={() => setLoadingIncomeHandler()}
        className="grid tiny:w-[130px] tablet:w-[160px] laptop:w-[190px] h-[130px] justify-self-end
               bg-input"
      >
        <div className="grid tiny:grid-cols-[50px_80px] tablet:grid-cols-[60px_100px] laptop:grid-cols-[85px_105px]  h-[110px]">
          <div
            onClick={() => setLoadingIncomeHandler()}
            className="grid items-center tiny:w-[34px] tiny:h-[34px] tablet:w-[44px]  tablet:h-[44px] bg-good rounded-[7px] self-center 
            justify-self-center cursor-pointer"
          >
            <FaPlus className="justify-self-center ml-[1px] mt-[1px]" />
          </div>
          <div className="grid justify-items-start self-center">
            <p className="tiny:text-[1.2rem] tablet:text-[1.6rem] text-skin-muted">
              Income
            </p>
            <p className="tiny:text-[1.4rem] tablet:text-[2rem] text-skin-good">
              ${balanse}
            </p>
          </div>
        </div>
        <Link
          href="/profile/addIncome"
          onClick={() => setLoadingIncomeHandler()}
          className="grid items-center w-[100%] h-[40px] bg-good 
          text-skin-ordinary text-[1.6rem] font-bold"
        >
          {isLoadingIncome ? "Loading..." : "Add income"}
        </Link>
      </div>
    );
  }

  if (type === "expense") {
    return (
      <div
        onClick={() => setLoadingIncomeHandler()}
        className="grid tiny:w-[130px] tablet:w-[160px] laptop:w-[190px] h-[130px] justify-self-end
               bg-input"
      >
        <div className="grid tiny:grid-cols-[50px_80px] tablet:grid-cols-[60px_100px] laptop:grid-cols-[85px_105px] h-[110px]">
          <div
            onClick={() => setLoadingIncomeHandler()}
            className="grid items-center tiny:w-[34px] tiny:h-[34px] tablet:w-[44px]  tablet:h-[44px] bg-danger rounded-[7px] self-center 
            justify-self-center cursor-pointer"
          >
            <FaMinus className="justify-self-center ml-[1px] mt-[1px]" />
          </div>
          <div className="grid justify-items-start self-center">
            <p className="tiny:text-[1.2rem] tablet:text-[1.6rem] text-skin-muted">
              Expense
            </p>
            <p className="tiny:text-[1.4rem] tablet:text-[2rem] text-skin-good">
              ${balanse}
            </p>
          </div>
        </div>
        <Link
          href="/profile/addExpense"
          onClick={() => setLoadingIncomeHandler()}
          className="grid items-center w-[100%] h-[40px] bg-danger 
          text-skin-ordinary text-[1.6rem] font-bold"
        >
          {isLoadingIncome ? "Loading..." : "Add expense"}
        </Link>
      </div>
    );
  }
};

export default Button;
