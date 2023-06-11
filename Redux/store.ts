"use client";

import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses/expensesSlice";
import userReducer from "./user/userSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: { expenses: expensesReducer, user: userReducer },
});

export const makeStore = (): any => {
  store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(makeStore);
