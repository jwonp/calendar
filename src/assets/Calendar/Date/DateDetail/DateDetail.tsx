import styles from "./DateDetail.module.scss";
import ScheduleLine from "../Schedule/ScheduleLine/ScheduleLine";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getNowDateWithDayjs, setDate } from "@/redux/featrues/nowDateSlice";
import { ScheduleWithUserDetail } from "@/types/types";
import { useMemo } from "react";
interface DateDetail {
  date: number;
  schedules: ScheduleWithUserDetail[];
}
const DateDetail = ({ date, schedules }: DateDetail) => {
  const dispatch = useAppDispatch();
  const nowDate = useAppSelector(getNowDateWithDayjs);
  const ScheduleLines = useMemo(() => {
    if (!schedules || schedules.length === 0) {
      return <div></div>;
    }
    return schedules
      .filter((_, index) => index < 2)
      .map((schedule, index) => (
        <ScheduleLine
          key={`${schedule.user.docId}-${index}`}
          text={schedule.user.name}
        />
      ));
  }, [schedules]);
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
        <div className={styles.schedules}>{ScheduleLines}</div>
        <div className={styles.etc}>
          {schedules.length > 2 ? `외 ${schedules.length - 2}명` : ""}
        </div>
      </div>
    </div>
  );
};
export default DateDetail;
