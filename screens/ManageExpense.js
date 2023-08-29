import { View, Text, StyleSheet } from "react-native";

const ManageExpense = ({ route }) => {
    const editedExpenseId = route.params?.expenseId;


    return (
        <View>
            <Text>ManageExpense</Text>
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({});
