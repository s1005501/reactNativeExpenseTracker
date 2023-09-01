import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";

import { GlobalStyles } from "../constants/style";
import IconButton from "../UI/IconButton";
import { ExpensesContext } from "../store/context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    const selectedExpense = expensesCtx.expenses.find((v, i) => {
        return v.id === editedExpenseId;
    });

    // navigation.goBack()每個function最後都要加，即做完操作後退回去看操作結果
    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = (expenseData) => {
        // 透過isEditing做判斷
        // true表示是更新
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        } else {
        }
        // false表示是新增
        if (!isEditing) {
            // 發AJAX
            storeExpense(expenseData);
            expensesCtx.addExpense(expenseData);
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
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
                submitButtonLabel={isEditing ? "Update" : "Add"}
            />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopColor: GlobalStyles.colors.primary200,
        borderTopWidth: 2,
        alignItems: "center",
    },
});
