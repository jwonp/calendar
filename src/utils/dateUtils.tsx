import dayjs from "dayjs";
export interface DateParam {
  year: string;
  month: string;
}
export interface DisplayDate {
  year: number;
  month: number;
  date: number;
  day: number;
}
export const Day = ["일", "월", "화", "수", "목", "금", "토"];
export const get10YearsFromThisYear = (thisYear: number): number[] => {
  const years: number[] = [];
  for (let year = thisYear - 5; year <= thisYear + 5; year += 1) {
    years.push(year);
  }
  return years;
};
export const add10YearsFromLastYear = (years: number[]) => {
  const lastYear = years[years.length - 1];
  const AddedYears = [...years];
  for (let year = lastYear + 1; year <= lastYear + 10; year += 1) {
    AddedYears.push(year);
  }
  return AddedYears;
};
export const add10YearsFromFirstYear = (years: number[]) => {
  const firstYear = years[0];
  let AddedYears = [...years];
  for (let year = firstYear - 1; year >= firstYear - 10; year -= 1) {
    AddedYears = [year, ...AddedYears];
  }
  return AddedYears;
};
// export const getAllFirstDays = (now: dayjs.Dayjs): dayjs.Dayjs[] => {
//   let count = 1;
//   const firstDaySub = 12330;
//   // const firstDaySub = 1000;
//   const first = now.subtract(firstDaySub, "day");
//   const firstDays: dayjs.Dayjs[] = [];
//   while (count <= firstDaySub * 2) {
//     const next = first.add(count, "day");
//     if (next.date() === 1) {
//       firstDays.push(next);
//     }
//     count += 1;
//   }
//   return firstDays;
// };

export const getDisplayDate = (date: dayjs.Dayjs) => {
  const displayDate: DisplayDate = {
    year: date.year(),
    month: date.month(),
    date: date.date(),
    day: date.day(),
  };
  return displayDate;
};
export const getOneMonth = (firstDay: string): DisplayDate[] => {
  const day = dayjs(firstDay, "YYYY-MM-DD");
  const month: DisplayDate[] = [getDisplayDate(day)];
  let nextDay = day.add(1, "day");
  while (nextDay.date() !== 1) {
    month.push(getDisplayDate(nextDay));
    nextDay = nextDay.add(1, "day");
  }

  return month;
};
export const getBlanks = (firstDay: dayjs.Dayjs) => {
  const dumyArray = [0, 0, 0, 0, 0, 0];
  const day = firstDay.day();
  const loopCount = day * -1;
  if (day === 0) return;
  return dumyArray.slice(loopCount).map((_, index) => <div key={index}></div>);
};

export const getFirstDay = (year: string, month: string): dayjs.Dayjs => {
  const day = `${year}/${String(parseInt(month)).padStart(2, "0")}/01`;
  const firstDay = dayjs(day, "YYYY/MM/DD");

  return firstDay;
};

export const getDateDayJsFormat = (
  year: number,
  month: number,
  date: number
) => {
  return dayjs(
    `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(
      2,
      "0"
    )}`,
    "YYYY-MM-DD"
  );
};
