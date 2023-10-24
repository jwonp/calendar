import Calendar from "@/assets/Calendar/Calendar";
import { useRouter } from "next/router";
import styles from "./Month.module.scss";
import useSWR from "swr";
import { UrlBuilder, DefaultFetcher } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import { Group, Schedule, User } from "@/types/dao";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNowDate, setYearMonth } from "@/redux/featrues/nowDateSlice";
import dayjs from "dayjs";
import { getSelectedGroup } from "@/redux/featrues/groupSelectSlice";
import { ScheduleWithUserDetail } from "@/types/types";

const MonthPage = () => {
  const router = useRouter();
  const selectedGroup = useAppSelector(getSelectedGroup);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const GroupScheduleSWR = useSWR<Schedule[]>(
    UrlBuilder(
      `/api/schedules/group/${selectedGroup.docId}/${
        router.query.year as string
      }/${router.query.month as string}`,
      selectedGroup.docId.length > 0
    ),
    DefaultFetcher
  );
  const GroupSchedules = useMemo<ScheduleWithUserDetail[]>(() => {
    if (!selectedGroup || !GroupScheduleSWR.data) {
      return [] as ScheduleWithUserDetail[];
    }
    const memberMap = new Map<string, Omit<User, "friends">>();
    selectedGroup.members.forEach((member) => {
      memberMap.set(member.docId, member);
    });
    const schedules = GroupScheduleSWR.data.map((schedule) => {
      const member = memberMap.get(schedule.userDocId) as Omit<User, "friends">;

      const newSchedule: ScheduleWithUserDetail = {
        user: member,
        date: schedule.date,
        schedule: schedule.schedule,
      };
      return newSchedule;
    });

    return schedules;
  }, [selectedGroup, GroupScheduleSWR]);

  useEffect(() => {
    dispatch(
      setNowDate({
        year: dayjs().year(),
        month: dayjs().month() + 1,
        date: dayjs().date(),
      })
    );
  }, []);
  useEffect(() => {
    const yearMonth = {
      year: parseInt(router.query.year as string),
      month: parseInt(router.query.month as string),
    };
    dispatch(setYearMonth(yearMonth));
  }, [router.query]);

  return (
    <div
      className={styles.container}
      onWheel={(e) => {
        // console.log((e.deltaY / 10) % 2, e.deltaY % 10);

        let year = parseInt(router.query.year as string);
        let month = parseInt(router.query.month as string);

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
          schedules={
            GroupSchedules?.length === 0 ? [] : GroupSchedules
          }
        />
      </div>
    </div>
  );
};
export default MonthPage;
