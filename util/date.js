// 看看有沒有更方便的轉換方式，不然就是要利用套件
export const getFormattedData = (date) => {
    // date.getMonth要＋1是因為月份拿到的會是月份的索引(實際值-1)，因此＋1補回去
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDateMinusDays = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
