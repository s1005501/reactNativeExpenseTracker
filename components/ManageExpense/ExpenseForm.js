// 乾作者驗證的邏輯似乎都是反得
import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../../UI/Button";
import { getFormattedData } from "../../util/date";
import { GlobalStyles } from "../../constants/style";

// function都寫在上層是為啥勒，直接傳isEditing進來會方便很多
const ExpenseForm = ({
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultValues,
}) => {
    // 這樣寫的確會很省很多段，
    // value做三元判斷決定欄位值是要有資料還是空值，有資料表示是update，空值表示add
    // isValid做資料驗證
    const [inputs, setInputs] = useState({
        // input值都是字串格式，數字資料要顯示要透過backtick或是toString()
        amount: {
            value: defaultValues ? `${defaultValues.amount}` : "",
            // 預設給tue是為了避免再新增時就顯示欄位錯誤的訊息
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedData(defaultValues.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
    });
    // input setter function
    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        // 欄位資料驗證
        // 金額必須不是NaN 且 需大於0
        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        // 日期驗證有點土炮，在JS裡，錯誤的日期格式會顯示空物件{}，但如果將其轉成字串會顯示Invalid Date，作者是透過這個字串去判斷
        const dataIsValid = expenseData.date.toString() !== "Invalid Date";
        // 敘述去頭尾空白後還有長度表示有內容
        const descriptionIsValid = expenseData.description.trim().length > 0;

        // // 表格驗證的第一種方式
        // if (!amountIsValid || !dataIsValid || !descriptionIsValid) {
        //     Alert.alert("Invalid input", "Please check your input values");
        //     return;
        // }

        // 表格驗證的第二種方式
        if (!amountIsValid || !dataIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: {
                        value: curInputs.amount.value,
                        isValid: amountIsValid,
                    },
                    date: {
                        value: curInputs.date.value,
                        isValid: dataIsValid,
                    },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    };

    // 如果formIsValid是true表示欄位有錯
    const formIsValid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                    style={styles.inputRow}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                    style={styles.inputRow}
                    invalid={!inputs.date.isValid}
                />
            </View>

            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, "description"),
                    value: inputs.description.value,
                }}
                invalid={!inputs.description.isValid}
                style={styles.inputMultiline}
            />
            {formIsValid && (
                <Text style={styles.errorText}>
                    Invalid inputs values - please check your entered data
                </Text>
            )}
            <View style={styles.buttons}>
                <Button onPress={onCancel} mode="flat" style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
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
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        marginBottom: 36,
    },
});
