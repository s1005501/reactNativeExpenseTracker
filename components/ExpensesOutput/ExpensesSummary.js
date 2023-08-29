import { View, Text } from "react-native";
import React from "react";

const ExpensesSummary = ({ periodName, expense }) => {
    const expensesSum = () => {
        expense.reduce((sum, expense) => {
            return sum + expense.amount;
        }, 0);
    };

    return (
        <View>
            <Text>{periodName}</Text>
            <Text>{expensesSum.toFixed(2)}</Text>
        </View>
    );
};

export default ExpensesSummary;
