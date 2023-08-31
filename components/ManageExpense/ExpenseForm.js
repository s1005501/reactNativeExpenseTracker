import { View, StyleSheet, Text } from "react-native";

import Input from "./Input";

const ExpenseForm = () => {
    const amountChangedHandler = () => {};
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: amountChangedHandler,
                    }}
                    style={styles.inputRow}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: () => {},
                    }}
                    style={styles.inputRow}
                />
            </View>

            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                }}
                style={styles.inputMultiline}
            />
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
        marginBottom: 24,
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputRow: {
        flex: 1,
    },
    inputMultiline: {
        marginBottom: 48,
    },
});
