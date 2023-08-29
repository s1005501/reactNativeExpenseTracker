import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expense }) => {
    const renderExpenseItem = (itemData) => {
        // 建議要傳很多值下去的話可以用其餘運算(...)，會比較方便
        // 但這個前提是拿到資料的元件解構時的名稱要跟傳下去的資料的key一致
        return <ExpenseItem {...itemData.item} />;
    };

    return (
        <FlatList
            data={expense}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => {
                return item.id;
            }}
        />
    );
};

export default ExpensesList;

const styles = StyleSheet.create({});
