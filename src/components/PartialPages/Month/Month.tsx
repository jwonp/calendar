import Calendar from "@/assets/Calendar/Calendar";
import { useRouter } from "next/router";
import styles from "./Month.module.scss";
const MonthPage = () => {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onWheel={(e) => {
        // console.log((e.deltaY / 10) % 2, e.deltaY % 10);

        let year = parseInt(router.query.year as string);
        let month = parseInt(router.query.month as string);
        console.log(year, month);
        if ((e.deltaY / 10) % 2 > 1 && e.deltaY % 10 > 7) {
          if (month === 12) {
            month = 1;
            year = year + 1;
          } else {
            month += 1;
          }
          router.push(`/calendar/${year}/${month}`);

          return;
        }
        if ((e.deltaY / 10) % 2 < -1 && e.deltaY % 10 < -7) {
          if (month === 1) {
            month = 12;
            year = year - 1;
          } else {
            month -= 1;
          }
          router.push(`/calendar/${year}/${month}`);

          return;
        }
      }}>
      <div>
        <Calendar
          year={router.query.year as string}
          month={router.query.month as string}
          withDetail
        />
      </div>
    </div>
  );
};
export default MonthPage;
