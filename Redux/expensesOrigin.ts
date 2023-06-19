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
  },
});

export const { setCurrentOrigin } = expensesOrigin.actions;
export const expensesOriginReducer = expensesOrigin.reducer;
