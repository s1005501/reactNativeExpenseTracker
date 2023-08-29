import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/style";
import { getFormattedData } from "../../util/date";

const ExpenseItem = ({ description, amount, date }) => {
    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate("ManageExpense");
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={expensePressHandler}
                style={({ pressed }) => {
                    return pressed && styles.pressed;
                }}
                android_ripple={{ color: "#ccc" }}
            >
                <View style={styles.expenseItem}>
                    <View>
                        <Text style={[styles.textBase, styles.description]}>
                            {description}
                        </Text>
                        <Text style={styles.textBase}>
                            {getFormattedData(date)}
                        </Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        overflow: "hidden",
        borderRadius: 6,
    },
    expenseItem: {
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: GlobalStyles.colors.primary500,
        elevation: 4,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },

    // 重用樣式
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    amountContainer: {
        minWidth: "20%",
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.75,
    },
});
