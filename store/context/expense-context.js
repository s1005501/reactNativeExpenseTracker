import { createContext, useReducer, useState } from "react";

// 作者用useContext搭配useReducer，乾createContext裡面到底是啥，名字都取一樣鬼知道是什麼
// 實際測試刪掉完全不影響功能
export const ExpensesContext = createContext({
    expenses: [],
    setExpense: (expense) => {},
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        // 單純去抓資料
        case "SET":
            // 有沒有reverse看起來好像差異不大?
            const inverted = action.payload.reverse();
            return inverted;

        case "ADD":
            return [action.payload, ...state];
        case "UPDATE":
            // 找到有比對到id的索引
            const updatableExpenseIndex = state.findIndex(
                (v) => v.id === action.payload.id
            );
            // 透過索引拿到比對到的資料
            const updatableExpense = state[updatableExpenseIndex];

            // 展開原始資料並將其與傳進來的資料合併，會叫data是因為updateExpense裡dispatch裡的payload
            const updatedItem = { ...updatableExpense, ...action.payload.data };

            // 複製原資料
            const updateExpenses = [...state];

            // 把更新過的值塞回複製過的陣列後回傳
            updateExpenses[updatableExpenseIndex] = updatedItem;

            return updateExpenses;

        // update個人寫法，這種方式好像比較簡短一點
        // state.map((v, i) => {
        //     if (v.id === action.payload.id) {
        //         return { ...v, ...action.payload.data };
        //     }
        //     return { ...v };
        // });
        case "DELETE":
            return state.filter((v, i) => {
                return v.id !== action.payload;
            });
        default:
            return state;
    }
};

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);
    // console.log(expensesState);
    const setExpense = (expenses) => {
        dispatch({ type: "SET", payload: expenses });
    };

    const addExpense = (expenseData) => {
        dispatch({ type: "ADD", payload: expenseData });
    };

    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const updateExpense = (id, expenseData) => [
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } }),
    ];

    const value = {
        expenses: expensesState,
        setExpense: setExpense,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesContextProvider;
