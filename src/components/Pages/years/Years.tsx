
import dayjs from "dayjs";

import { useEffect, useState } from "react";

import styles from "./Years.module.scss";
import Calendar from "@/assets/Calendar/Calendar";
import { getAllFirstDays } from "@/utils/dateUtils";
import { useRouter, useSearchParams } from "next/navigation";

const CalendarYearPage = () => {
  const now = dayjs();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [days, setDays] = useState<dayjs.Dayjs[]>([]);
  useEffect(() => {
    if (!now) {
      return;
    }
    const allFirstDays = getAllFirstDays(now);
    setDays(allFirstDays);
  }, []);
  useEffect(() => {
    if (searchParams.get("year")) {
      router.push(`/calendar/years#year${searchParams.get("year")}`);
    }
  }, [router, searchParams]);
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {days.map((item, index) => {
          if (item.month() === 0) {
            return (
              <>
                <div
                  id={`year${item.year()}`}
                  className={styles.indicator}></div>
                <div
                  className={styles.gridOneLine}
                  key={`year${item.year()}`}>
                  <div>{`${item.year()} 년`}</div>
                </div>
                <Calendar
                  key={index}
                  year={item.year().toString()}
                  month={(item.month() + 1).toString()}
                />
              </>
            );
          }

          return (
            <Calendar
              key={index}
              year={item.year().toString()}
              month={(item.month() + 1).toString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarYearPage;
