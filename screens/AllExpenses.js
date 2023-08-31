import { View, Text } from "react-native";
import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expense-context";

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    // 個人比較習慣解構
    // const {expenses} = useContext(ExpensesContext);

    return (
        <ExpensesOutput
            expensesPeriod="Total"
            expenses={expensesCtx.expenses}
            fallbackText="No registered expenses found!"
        />
    );
};

export default AllExpenses;
