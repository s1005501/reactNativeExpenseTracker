import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";

import { GlobalStyles } from "../constants/style";
import IconButton from "../UI/IconButton";
import { ExpensesContext } from "../store/context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverLay from "../UI/ErrorOverLay";

const ManageExpense = ({ route, navigation }) => {
    // 判斷loading的狀態
    // 預設給false是因為有發api才有動作所以會是false
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 錯誤狀態
    const [error, setError] = useState();

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    const selectedExpense = expensesCtx.expenses.find((v, i) => {
        return v.id === editedExpenseId;
    });

    // navigation.goBack()每個function最後都要加，即做完操作後退回去看操作結果
    const deleteExpenseHandler = async () => {
        // 不用再把loading狀態改成false，因為最後都會觸發路由的goBack()
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (err) {
            setError("Could not delete expense - please try again later");
            // 要把送出狀態改成false才能判斷error畫面
            setIsSubmitting(false);
        }
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = async (expenseData) => {
        setIsSubmitting(true);
        // 透過isEditing做判斷，true表示是更新，false表示是新增
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            }
            if (!isEditing) {
                // 發AJAX
                // 拿到id在把它塞進狀態
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (err) {
            setError("Could not save data - please try again!");
            setIsSubmitting(false);
        }
    };

    useLayoutEffect(() => {
        // 透過這個判斷是從哪點擊進來的，是要做修改還是新增，顯示不同樣式
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
        // 實在不太懂綁navigation的用意
    }, [navigation, isEditing]);

    const errorHandler = () => {
        setError(null);
    };
    if (error && !isSubmitting) {
        return <ErrorOverLay message={error} onConfirm={errorHandler} />;
    }

    // loading畫面
    if (isSubmitting) {
        return <LoadingOverlay />;
    }

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
