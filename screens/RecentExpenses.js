import { View, Text } from "react-native";
import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expense-context";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={expensesCtx.expenses}
        />
    );
};

export default RecentExpenses;
