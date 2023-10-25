import dayjs from "dayjs";

import { useEffect, useMemo, useState } from "react";
import styles from "./Years.module.scss";

import {
  add10YearsFromFirstYear,
  add10YearsFromLastYear,
  get10YearsFromThisYear,
} from "@/utils/dateUtils";

import Year from "@/assets/Year/Year";

const CalendarYearPage = () => {
  const [years, setYears] = useState<number[]>([]);
  useEffect(() => {
    setYears(get10YearsFromThisYear(dayjs().year()));
  }, []);
  const Years = useMemo(() => {
    return years.map((year, index) => (
      <Year
        key={index}
        year={year}
      />
    ));
  }, [years]);
  return (
    <div
      className={styles.container}
      onScroll={(e) => {
        const isTop = e.currentTarget.scrollTop === 0;
        const isBottom =
          e.currentTarget.scrollHeight -
            e.currentTarget.scrollTop -
            e.currentTarget.offsetHeight <=
          0.5;
        const elHeight = Math.floor(
          e.currentTarget.scrollHeight / years.length
        );

        if (isTop) {
          setYears(add10YearsFromFirstYear(years));
          e.currentTarget.scroll({ top: elHeight * 10 });
        }
        if (isBottom) {
          setYears(add10YearsFromLastYear(years));
        }
      }}>
      {Years}
    </div>
  );
};

export default CalendarYearPage;
