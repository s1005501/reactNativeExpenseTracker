import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";

import { GlobalStyles } from "../constants/style";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    // navigation.goBack()每個function最後都要加，即做完操作後退回去看操作結果
    const deleteExpenseHandler = () => {
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = () => {
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
