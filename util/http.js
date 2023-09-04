import axios from "axios";

// // 正確路徑
// const BACKEND_URL =
//     "https://react-native-course-36558-default-rtdb.firebaseio.com/";

// 測試錯誤用的路徑
const BACKEND_URL =
    "https://react-native-course-36558-default-rtdb.firebaseio.com/";

// 新增資料的api
export const storeExpense = async (expenseData) => {
    // post
    // axios.post("firebase提供的路徑/自定義的json檔");
    const response = await axios.post(
        BACKEND_URL + "/expenses.json",
        expenseData
    );
    // firebase生成的id是存放在name屬性裡
    const id = response.data.name;
    return id;
};

// 抓資料的api
export const fetchExpense = async () => {
    const response = await axios.get(BACKEND_URL + "/expenses.json");

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }

    // console.log(expenses);
    return expenses;
};

// 更新的api
// 這裡不用async，到真的要送資料在給async就好
export const updateExpense = (id, expenseData) => {
    // 在firebase裡如果要更新特定id的資料要寫/檔案名/id.json
    // put
    // axios.put("firebase提供的路徑/自定義的檔名(沒有.json)/id(即firebase裡的name).json");

    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

// 刪除的api
// 這裡不用async，到真的要送資料在給async就好
export const deleteExpense = (id) => {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
