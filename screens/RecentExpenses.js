import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverLay from "../UI/ErrorOverLay";

const RecentExpenses = () => {
    // 用來判斷是否loading出現與否
    // 預設給true是因為一進來就抓資料所以會是true
    const [isFetching, setIsFetching] = useState(true);

    // 判斷錯誤是否有發生
    const [error, setError] = useState();

    // context
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

    useEffect(() => {
        // 在async/await一次是因為要再處理資料
        const getExpense = async () => {
            // 不太懂為什麼要加這行，預設不就給true了嗎
            setIsFetching(true);

            // 只try/catch異步因為錯誤發生完後要離開loading畫面
            try {
                const expense = await fetchExpense();
                expensesCtx.setExpense(expense);
            } catch (err) {
                setError("Could not fetch Expenses!");
            }
            setIsFetching(false);
        };
        getExpense();
    }, []);

    const errorHandler = () => {
        setError("");
    };
    // 錯誤畫面
    if (error && !isFetching) {
        return <ErrorOverLay message={error} onConfirm={errorHandler} />;
    }

    // loading畫面
    if (isFetching) {
        return <LoadingOverlay />;
    }

    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallbackText="No expenses registered for the last 7 days"
        />
    );
};

export default RecentExpenses;
