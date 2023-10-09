import dayjs from "dayjs";

import { useEffect, useState } from "react";
import styles from "./Years.module.scss";
import Calendar from "@/assets/Calendar/Calendar";
import { getAllFirstDays } from "@/utils/dateUtils";
import { useRouter } from "next/router";
import Link from "next/link";

const CalendarYearPage = () => {
  const now = dayjs();
  const router = useRouter();

  const [days, setDays] = useState<dayjs.Dayjs[]>([]);
  useEffect(() => {
    if (!now) {
      return;
    }
    const allFirstDays = getAllFirstDays(now);
    setDays(allFirstDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (days.length === 0) {
      return;
    }
    if (router?.query?.year) {
      router.push(`/years#year${router?.query?.year}`);
    }
  }, [router, days]);
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {days.length > 1 &&
          days.map((item, index) => {
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
                  <Link
                    className={styles.month}
                    key={index}
                    href={`/calendar/[year]/[month]`}
                    as={`/calendar/${item.year()}/${item.month() + 1}`}>
                    <Calendar
                      year={item.year().toString()}
                      month={(item.month() + 1).toString()}
                    />
                  </Link>
                </>
              );
            }

            return (
              <Link
                className={styles.month}
                key={index}
                href={`/calendar/[year]/[month]`}
                as={`/calendar/${item.year()}/${item.month() + 1}`}>
                <Calendar
                  year={item.year().toString()}
                  month={(item.month() + 1).toString()}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarYearPage;
