import styles from "./DateDetail.module.scss";
import ScheduleLine from "../ScheduleLine/ScheduleLine";
interface DateDetail {
  date: number;
  schedule?: object[];
}
const DateDetail = ({ date, schedule }: DateDetail) => {
  return (
    <div className={styles.container}>
      <div>{date}</div>
      <div className={styles.scheduleBox}>
        <div className={styles.schedules}>
          <ScheduleLine text={"일정 1"} />
          <ScheduleLine text={"일정 2"} />
        </div>
          <div className={styles.etc}>외 2 명</div>
      </div>
    </div>
  );
};
export default DateDetail;
