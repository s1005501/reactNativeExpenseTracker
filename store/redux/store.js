import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expense";

const store = configureStore({
    reducer: {
        expense: expenseReducer,
    },
});

export default store;
