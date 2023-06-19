import { configureStore } from "@reduxjs/toolkit";
import { expensesOriginReducer } from "./expensesOrigin";

const store = configureStore({
  reducer: {
    expensesOrigin: expensesOriginReducer,
  },
});
export default store;
export * from "./expensesOrigin";
