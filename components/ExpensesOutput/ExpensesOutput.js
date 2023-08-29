import { View, Text } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("1993-04-15"),
    },
    {
        id: "e2",
        description: "A pair of trouser",
        amount: 89.29,
        date: new Date("1993-04-23"),
    },
    {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("1993-04-08"),
    },
];

// expense是物件陣列
const ExpensesOutput = ({ expense, expensesPeriod }) => {
    return (
        <View>
            <ExpensesSummary expense={expense} periodName={expensesPeriod} />
            <ExpensesList />
        </View>
    );
};

export default ExpensesOutput;
