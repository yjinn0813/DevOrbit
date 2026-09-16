/* formatDate function */

export function formatDateRange(startDate: string, endDate: string){
  const [startYear, startMonth, startDay] = startDate
    .slice(0, 10)
    .split("-");
  const [endYear, endMonth, endDay] = endDate
    .slice(0, 10)
    .split("-");

  if (startYear === endYear) {
    return `${startYear}.${startMonth}.${startDay} ~ ${endMonth}.${endDay}`;
  }

  return `${startYear}.${startMonth}.${startDay} ~ ${endYear}.${endMonth}.${endDay}`;
};

//
export function formatDate(date: string){
  return date.slice(0, 10).replace(/-/g, ".");
};