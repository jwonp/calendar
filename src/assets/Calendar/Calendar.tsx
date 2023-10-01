import styles from "./Calendar.module.scss";
import { useState } from "react";
import {
  DisplayDate,
  getOneMonth,
  getBlanks,
  getFirstDay,
} from "@/utils/dateUtils";
import { useRouter } from "next/navigation";
import DateDetail from "./Date/DateDetail/DateDetail";

interface CalendarProps {
  year: string;
  month: string;
  withDetail?: boolean;
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
const Calendar = ({ year, month, withDetail }: CalendarProps) => {
  const router = useRouter();
  const [oneMonth, setOneMonth] = useState<DisplayDate[]>(
    getOneMonth(getFirstDay(year, month).format("YYYY-MM-DD"))
  );
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        router.push(`/calendar/${oneMonth[0].year}/${oneMonth[0].month + 1}`);
      }}>
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
              {withDetail ? <DateDetail date={item.date} /> : item.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
