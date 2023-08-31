import { View, TextInput, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";

import { GlobalStyles } from "../constants/style";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    // navigation.goBack()每個function最後都要加，即做完操作後退回去看操作結果
    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
        // 透過isEditing做判斷
        // true表示是更新
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {
                description: "test update",
                amount: 888.88,
                // 這裡要用Date物件格式
                date: new Date("1993-4-12"),
            });
        } else {
        }

        // false表示是新增
        if (!isEditing) {
            expensesCtx.addExpense({
                description: "test add",
                amount: 999.99,
                // 這裡要用Date物件格式
                date: new Date("1993-4-14"),
            });
            // console.log(expensesCtx.expenses);
        }
        navigation.goBack();
    };

    useLayoutEffect(() => {
        // 透過這個判斷是從哪點擊進來的，是要做修改還是新增，顯示不同樣式
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
        // 實在不太懂綁navigation的用意
    }, [navigation, isEditing]);

    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttons}>
                <Button
                    onPress={cancelHandler}
                    mode="flat"
                    style={styles.button}
                >
                    Cancel
                </Button>
                <Button onPress={confirmHandler} style={styles.button}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            <View style={styles.deleteContainer}>
                {isEditing && (
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                )}
            </View>
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopColor: GlobalStyles.colors.primary200,
        borderTopWidth: 2,
        alignItems: "center",
    },
});
