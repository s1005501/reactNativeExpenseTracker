import { View, Text, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/style";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary expense={expenses} periodName={expensesPeriod} />
            <ExpensesList expense={expenses} />
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
