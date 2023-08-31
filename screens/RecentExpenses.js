import { View, Text } from "react-native";
import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expense-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((v, i) => {
        // 作者寫法
        // 時間function在util資料夾
        const today = new Date("1993-04-16");
        const date7DaysAge = getDateMinusDays(today, 7);
        // console.log(v.date > date7DaysAge);
        // 好像可以直接比較日期，是因為JS幫忙轉成timestamp了嗎?值是越新越大
        // 要介於比過7天大比今天小的區間
        return v.date >= date7DaysAge && v.date <= today;

        // // 個人寫法，透過timestamp
        // const today = Date.parse(new Date("1993-04-18"));
        // // 一週的timestamp 604800000
        // if (
        //     today - Date.parse(v.date) < 604800000 &&
        //     today - Date.parse(v.date) > 0
        // ) {
        //     // console.log(today - Date.parse(v.date));

        //     return { ...v };
        // }
    });
    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallbackText="No expenses registered for the last 7 days"
        />
    );
};

export default RecentExpenses;
