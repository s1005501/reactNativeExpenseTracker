import { View, Text } from "react-native";
import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ExpensesContext from "../store/context/expense-context";

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    // 個人比較習慣解構
    // const {expenses} = useContext(ExpensesContext);

    const recentExpense = expensesCtx.expenses.filter((v, i) => {
        return;
    });

    return (
        <ExpensesOutput
            expensesPeriod="Total"
            expenses={expensesCtx.expenses}
        />
    );
};

export default AllExpenses;
