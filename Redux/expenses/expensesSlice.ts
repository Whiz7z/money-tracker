"use client";

import { createSlice } from "@reduxjs/toolkit";

interface ExpenseItem {
  amount: number;
  type: string;
  _id: string;
}

export interface ExpenseState extends Array<ExpenseItem> {}

const initialState: ExpenseState = [];

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: { type: string; payload: ExpenseItem }) => {
      state.push(action.payload);
    },
    setExpenses: (state, action: { type: string; payload: ExpenseItem[] }) => {
      return action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
