import { createSlice } from "@reduxjs/toolkit";

const initState = {};

const expenseSlice = createSlice({
    name: "expense",
    initialState: initState,
    reducers: {},
});

const expenseReducer = expenseSlice.reducer;
export default expenseReducer;

export const expenseActions = expenseSlice.actions;
