import Link from "next/link";
import Calendar from "../Calendar/Calendar";
import styles from "./Year.module.scss";
interface YearProps {
  year: number;
}

const Year = ({ year }: YearProps) => {
  const MONTH_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const Months = MONTH_LIST.map((month, index) => (
    <Link
      className={styles.month}
      key={`Link-${year}-${index}`}
      href={`/calendar/[year]/[month]`}
      as={`/calendar/${year}/${month}`}>
      <Calendar
        year={year.toString()}
        month={month.toString()}
      />
    </Link>
  ));
  return (
    <div>
      <div
        id={`year${year}`}
        className={styles.indicator}></div>
      <div
        className={styles.gridOneLine}
        key={`year${year}`}>
        {`${year} 년`}
      </div>
      <div  className={styles.grid}>{Months}</div>
    </div>
  );
};

export default Year;
