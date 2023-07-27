"use client";
import React, { useState } from "react";
import Link from "next/link";

type Props = {
  type: string;
};

const Button = ({ type }: Props) => {
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

  if (type === "expense") {
    return (
      <Link
        onClick={() => setLoadingIncomeHandler()}
        href="/profile/addIncome"
        className="inline-block w-[110px] laptop:w-[220px] tablet:w-[160px] h-[40px] tablet:h-[60px] justify-self-end
               bg-accent rounded-[15px] font-bold text-[1.8rem] tablet:text-[2.2rem] laptop:text-[2.8rem] text-skin-dark text-center leading-[4rem] tablet:leading-[6rem]	"
      >
        {isLoadingIncome ? "Loading..." : "+ income"}
      </Link>
    );
  }

  if (type === "income") {
    return (
      <Link
        onClick={() => setLoadingExpenseHandler()}
        href="/profile/addExpense"
        className="inline-block tablet:w-[160px] w-[110px] laptop:w-[220px] h-[40px] tablet:h-[60px] justify-self-start
               bg-semitransparent rounded-[15px] font-bold text-[1.8rem] tablet:text-[2.2rem] laptop:text-[2.8rem] text-center leading-[4rem] tablet:leading-[6rem]"
      >
        {isLoadingExpense ? "Loading..." : "+ expense"}
      </Link>
    );
  }
};

export default Button;
