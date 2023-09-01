// 看看有沒有更方便的轉換方式，不然就是要利用套件
export const getFormattedData = (date) => {
    return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
