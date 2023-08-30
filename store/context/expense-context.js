import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("1993-04-15"),
    },
    {
        id: "e2",
        description: "A pair of trouser",
        amount: 89.29,
        date: new Date("1993-04-23"),
    },
    {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("1993-04-08"),
    },
    {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: new Date("1993-05-25"),
    },
    {
        id: "e5",
        description: "Another book",
        amount: 18.99,
        date: new Date("1993-05-24"),
    },
    {
        id: "e6",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("1993-04-15"),
    },
    {
        id: "e7",
        description: "A pair of trouser",
        amount: 89.29,
        date: new Date("1993-04-23"),
    },
    {
        id: "e8",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("1993-04-08"),
    },
    {
        id: "e9",
        description: "A book",
        amount: 14.99,
        date: new Date("1993-05-25"),
    },
    {
        id: "e10",
        description: "Another book",
        amount: 18.99,
        date: new Date("1993-05-24"),
    },
];

// 作者用useContext搭配useReducer，乾createContext裡面到底是啥，名字都取一樣鬼知道是什麼
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
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
    const [expensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    );

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
