"use client";

import React, { useEffect, useState } from "react";
import type { RootState } from "../Redux/store";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, setExpenses } from "../Redux/expenses/expensesSlice";
import { getExpenses } from "@/requests/expenses";
import { nanoid } from "nanoid";
type Props = {};

const Balance = (props: Props) => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR("expenses", getExpenses);

  useEffect(() => {
    if (data) {
      dispatch(setExpenses(data));
    }
  }, [data]);

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      console.log("expenses", expenses);
    }
  }, [expenses]);

  return (
    <section className="grid grid-cols-2 grid-rows-3">
      <p className="col-start-1 col-end-3">My Balance</p>
      <h1 className="col-start-1 col-end-3">$8,080.00</h1>
      <div className=" col-start-1 col-end-3 grid grid-cols-2">
        <button className="w-[100%] bg-green-600">+ Expense</button>
        <button className="w-[100%] bg-red-600">+ Income</button>
      </div>
      {data &&
        data.length > 0 &&
        data.map((el: any) => <div key={nanoid()}>{el.amount}</div>)}
    </section>
  );
};

export default Balance;
