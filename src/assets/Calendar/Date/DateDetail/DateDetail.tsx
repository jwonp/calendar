import styles from "./DateDetail.module.scss";
import ScheduleLine from "../Schedule/ScheduleLine/ScheduleLine";
import { Schedule } from "@/types/dao";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getNowDateWithDayjs, setDate } from "@/redux/featrues/nowDateSlice";
interface DateDetail {
  date: number;
  schedule: Schedule;
}
const DateDetail = ({ date, schedule }: DateDetail) => {
  const dispatch = useAppDispatch();
  const nowDate = useAppSelector(getNowDateWithDayjs);

  return (
    <div
      className={styles.container}
      onClick={() => {
        dispatch(setDate(date));
      }}>
      <div className={nowDate.date() === date ? styles.date : undefined}>
        {date}
      </div>
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
