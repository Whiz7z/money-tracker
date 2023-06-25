import { createSlice } from "@reduxjs/toolkit";
export const expensesOrigin = createSlice({
  name: "expensesOrigin",
  initialState: {
    currentOrigin: {
      name: null,
      color: null,
    },
  },
  reducers: {
    setCurrentOrigin: (state, action) => {
      state.currentOrigin.name = action.payload.name;
      state.currentOrigin.color = action.payload.color;
    },
    resetCurrentOrigin: (state) => {
      state.currentOrigin.name = null;
      state.currentOrigin.color = null;
    },
  },
});

export const { setCurrentOrigin, resetCurrentOrigin } = expensesOrigin.actions;
export const expensesOriginReducer = expensesOrigin.reducer;
