"use client";

import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  token: string;
  expensesTypes: [string];
  incomesTypes: [string];
}

let initialState: User | any = {};

if (typeof window !== "undefined") {
  console.log("You are on the browser");
  initialState = {
    user: {
      id: JSON.parse(localStorage.getItem("userInfo")!)?.id ?? null,
      username: JSON.parse(localStorage.getItem("userInfo")!)?.username ?? null,
      token: JSON.parse(localStorage.getItem("userInfo")!)?.token ?? null,
      expensesTpes:
        JSON.parse(localStorage.getItem("userInfo")!)?.expensesTpes ?? null,
      incomesTpes:
        JSON.parse(localStorage.getItem("userInfo")!)?.incomesTpes ?? null,
    },
  };
} else {
  console.log("You are on the server");
  // 👉️ can't use localStorage
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }: any) => {
      localStorage.setItem("userInfo", JSON.stringify(payload));
      console.log("payload", payload);
      state.user = payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
