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

//
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

            // 資料少的話好像可以，如果資料多且傳過來的
            state.map((v, i) => {
                if (v.id === action.payload.id) {
                    return { ...v, ...action.payload };
                }
                return { ...v };
            });


            return;
        case "DELETE":
            return;
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

    return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
