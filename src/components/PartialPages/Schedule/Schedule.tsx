import { useRouter } from "next/router";
import styles from "./Schedule.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { getNowDateWithDayjs } from "@/redux/featrues/nowDateSlice";
import { Schedule as RowSchedule } from "@/types/dto";
import { Group, Schedule, User } from "@/types/dao";
import { useSession } from "next-auth/react";
import axios from "axios";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { getSelectedGroup } from "@/redux/featrues/groupSelectSlice";
import { repeatGrid } from "@/utils/stringUtils";
import MemberSchedule from "@/assets/Calendar/Date/Schedule/MemberSchedule/MemberSchedule";

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const minutes = [0, 15, 30, 45];
const createTimes = () => {
  const times: string[] = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      times.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    });
  });
  return times;
};

const SchedulePage = () => {
  const router = useRouter();

  const selectedGroup = useAppSelector(getSelectedGroup);
  const nowDate = useAppSelector(getNowDateWithDayjs);
  const { data: session } = useSession();
  const [times, setTimes] = useState<string[]>(createTimes());
  const [selected, setSelected] = useState<boolean[]>(
    createTimes().map(() => false)
  );
  const url = useMemo(() => {
    return `/api/schedules/user/${session?.user?.docId}/${
      router.query.year as string
    }/${router.query.month as string}`;
  }, [session?.user?.docId, router.query]);
  const ScheduleSWR = useSWR<Schedule[]>(
    UrlBuilder(url, session?.user?.docId !== undefined),
    DefaultFetcher
  );

  const GroupScheduleSWR = useSWR<Schedule[]>(
    UrlBuilder(
      `/api/schedules/group/${selectedGroup.docId}/${
        router.query.year as string
      }/${router.query.month as string}`,
      selectedGroup.docId !== "" && selectedGroup.docId !== undefined
    ),
    DefaultFetcher
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const selectFlag = useRef<boolean>(false);
  const loadingFlag = useRef<boolean>(false);
  const GroupMemberScheduleMap = useMemo<
    Map<number, Omit<User, "friends">[]>
  >(() => {
    if (!selectedGroup || !GroupScheduleSWR.data) {
      return new Map<number, Omit<User, "friends">[]>();
    }
    //init memberMap
    const memberMap = new Map<string, Omit<User, "friends">>();
    selectedGroup.members.forEach((member) => {
      memberMap.set(member.docId, member);
    });
    console.log({
      title: "memberMap",
      members: memberMap.entries(), //Array.from(memberMap.values()),
    });
    console.log({
      title: "rowScheuldes",
      rowSchedules: GroupScheduleSWR.data
        .filter(
          (schedule) =>
            schedule.date.year === nowDate.year() &&
            schedule.date.month === nowDate.month() + 1 &&
            schedule.date.date === nowDate.date()
        )
       
        .map((schedule) => {
          return { userDocId: schedule.userDocId, schedule: schedule.schedule };
        }),
    });
    const nowDataSchedule = GroupScheduleSWR.data.filter(
      (schedule) =>
        schedule.date.year === nowDate.year() &&
        schedule.date.month === nowDate.month() + 1 &&
        schedule.date.date === nowDate.date()
    ) .filter((schedule)=> schedule.userDocId !== session?.user?.docId);
    //init scheduleMap
    const scheduleMap = new Map<number, Omit<User, "friends">[]>();
    nowDataSchedule.forEach((schedule) => {
      schedule.schedule.forEach((time, timeIndex) => {
        if (time) {
          const targetMember = memberMap.get(schedule.userDocId);
          const preMembers = scheduleMap.get(timeIndex);
          if (targetMember !== undefined) {
            if (preMembers) {
              scheduleMap.set(timeIndex, [...preMembers, targetMember]);
            } else {
              scheduleMap.set(timeIndex, [targetMember]);
            }
          }
        }
      });
    });
    console.log({
      title: "scheduleMap",
      schedules: Array.from(scheduleMap.values()),
    });

    return scheduleMap;
  }, [selectedGroup, GroupScheduleSWR]);

  useEffect(() => {
    const isNotReadyToLoading =
      !ScheduleSWR.data || loadingFlag.current === false;
    if (isNotReadyToLoading) {
      return;
    }

    if (ScheduleSWR.data) {
      const nowScheduleArray = ScheduleSWR.data.filter(
        (schedule) => schedule.date.date === nowDate.date()
      );

      if (nowScheduleArray.length > 1 || nowScheduleArray.length === 0) {
        setSelected(createTimes().map(() => false));
        return;
      }
      const nowSchedule = nowScheduleArray[0];

      setSelected(nowSchedule.schedule);
      loadingFlag.current = false;
    }
  }, [ScheduleSWR.data, nowDate]);
  useEffect(() => {
    ScheduleSWR.mutate();
    loadingFlag.current = true;
  }, [nowDate]);

  return (
    <div className={styles.container}>
      <div className={styles.scrollBox}>
        <div className={styles.gridBox}>
          <div>
            {times.map((time, index) => (
              <div
                key={`index${index}`}
                className={`${styles.time} ${
                  time.endsWith("00") === false && styles.smallText
                }`}>
                {time}
              </div>
            ))}
            <div>00:00</div>
          </div>
          <div
            className={styles.timeTable}
            onMouseDown={() => {
              setIsMouseDown(() => true);
            }}
            onMouseUp={() => {
              setIsMouseDown(() => false);
              if (!session?.user?.docId) {
                return;
              }

              const schedule: RowSchedule = {
                userDocId: session?.user?.docId,
                year: nowDate.year(),
                month: nowDate.month() + 1,
                date: nowDate.date(),
                day: nowDate.day(),
                schedule: selected,
              };
              const isExistScheduleAtDate =
                ScheduleSWR.data &&
                ScheduleSWR.data.filter(
                  (item) => item.date.date === nowDate.date()
                ).length === 1 &&
                JSON.stringify(ScheduleSWR.data) === JSON.stringify(selected);
              if (isExistScheduleAtDate) {
                axios.patch("/api/schedules/user", schedule);
                return;
              }
              axios.post("/api/schedules/user", schedule);
            }}>
            {times.map((time, timeIndex) => (
              <div
                id={timeIndex.toString()}
                key={timeIndex}
                className={`${styles.line} ${
                  timeIndex === times.length - 1 && styles.borderBottom
                } ${selected[timeIndex] && styles.selected}`}
                onMouseDown={() => {
                  const selectedTimes = [...selected];
                  selectFlag.current = !selected[timeIndex];
                  selectedTimes[timeIndex] = selectFlag.current;
                  setSelected(() => [...selectedTimes]);
                }}
                onClick={() => {}}
                onMouseEnter={() => {
                  const selectedItems = [...selected];
                  if (!isMouseDown) {
                    return;
                  }
                  selectedItems[timeIndex] = selectFlag.current;
                  setSelected(() => [...selectedItems]);
                }}>
                <div></div>
                <div
                  className={styles["test"]}
                  style={{
                    gridTemplateColumns: GroupMemberScheduleMap.get(timeIndex)
                      ? repeatGrid(
                          "1fr",
                          (
                            GroupMemberScheduleMap.get(timeIndex) as Omit<
                              User,
                              "friends"
                            >[]
                          ).length
                        )
                      : "1fr",
                  }}>
                  {GroupMemberScheduleMap.get(timeIndex)?.map((member, index) => (
                      <MemberSchedule
                        key={`${timeIndex}-${index}`}
                        {...member}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
