import { View, Text, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/style";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
    // 可以用變數承接JSX
    // 作者是用判斷式和let來寫
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length) {
        content = <ExpensesList expense={expenses} />;
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expense={expenses} periodName={expensesPeriod} />
            {content}

            {/* 我的想法 */}
            {/* {expenses.length ? (
                <ExpensesList expense={expenses} />
            ) : (
                <Text style={styles.infoText}>沒東西～</Text>
            )} */}
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
    infoText: {
        textAlign: "center",
        color: "#fff",
        marginTop: 32,
        fontSize: 16,
    },
});
