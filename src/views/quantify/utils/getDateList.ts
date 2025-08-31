// 辅助函数：格式化日期为YYYY-MM-DD
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getPreviousWorkdays = (count: number) => {
  const result = [];
  const currentDate = new Date();

  // 从当前日期开始，向前查找
  let date = new Date(currentDate);

  while (result.length < count) {
    // 向前移动一天

    // 检查是否为周末（0是周日，6是周六）
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      // 格式化日期为YYYY-MM-DD
      const formattedDate = formatDate(date);
      result.push(formattedDate);
    }
    date.setDate(date.getDate() - 1);
  }

  return result;
};