import { View, Text } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpenses = () => {
    return <ExpensesOutput expensesPeriod="Last 7 days" />;
};

export default RecentExpenses;
