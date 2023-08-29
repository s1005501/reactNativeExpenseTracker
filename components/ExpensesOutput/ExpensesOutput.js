import { View, Text, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/style";

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
    {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: new Date("1993-05-25"),
    },
    {
        id: "e5",
        description: "Another book",
        amount: 18.99,
        date: new Date("1993-05-24"),
    },
    {
        id: "e6",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("1993-04-15"),
    },
    {
        id: "e7",
        description: "A pair of trouser",
        amount: 89.29,
        date: new Date("1993-04-23"),
    },
    {
        id: "e8",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("1993-04-08"),
    },
    {
        id: "e9",
        description: "A book",
        amount: 14.99,
        date: new Date("1993-05-25"),
    },
    {
        id: "e10",
        description: "Another book",
        amount: 18.99,
        date: new Date("1993-05-24"),
    },
];

// expense是物件陣列
const ExpensesOutput = ({ expense, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expense={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList expense={DUMMY_EXPENSES} />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});
