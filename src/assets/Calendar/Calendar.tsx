import styles from "./Calendar.module.scss";
import { useEffect, useMemo, useState } from "react";
import {
  DisplayDate,
  getOneMonth,
  getBlanks,
  getFirstDay,
  getDisplayDate,
} from "@/utils/dateUtils";

import DateDetail from "./Date/DateDetail/DateDetail";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Schedule } from "@/types/dao";
interface CalendarProps {
  year: string;
  month: string;
  schedules?: Schedule[];
}
const getDayColor = (day: number) => {
  if (day === 0) {
    return styles.sun;
  }
  if (day === 6) {
    return styles.sat;
  }
  return undefined;
};
const DumySchedule: Schedule = {
  userDocId: "",
  date: {
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  },
  schedule: [],
};
const Calendar = ({ year, month, schedules }: CalendarProps) => {
  const router = useRouter();
  const [oneMonth, setOneMonth] = useState<DisplayDate[]>([
    getDisplayDate(dayjs()),
  ]);
  useEffect(() => {
    if (router.isReady) {
      setOneMonth(getOneMonth(getFirstDay(year, month).format("YYYY-MM-DD")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.yearMonth}>{`${oneMonth[0].month + 1} 월`}</div>
      <div className={styles.dateConatiner}>
        <div className={`${styles.weekGrid} ${styles.weekColumn}`}>
          <div className={styles.sun}>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className={styles.sat}>토</div>
        </div>
        <div className={styles.weekGrid}>
          {year && getBlanks(getFirstDay(year, month))}
          {oneMonth.map((item, index) => (
            <div
              key={index}
              className={getDayColor(item.day)}>
              {schedules ? (
                <DateDetail
                  date={item.date}
                  schedule={
                    schedules.filter(
                      (schedule) => schedule.date.date === item.date
                    )[0]
                  }
                />
              ) : (
                item.date
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
