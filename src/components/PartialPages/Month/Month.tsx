import Calendar from "@/assets/Calendar/Calendar";
import { useRouter } from "next/router";
import styles from "./Month.module.scss";
import useSWR from "swr";
import { UrlBuilder, DefaultFetcher } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import { Schedule, User } from "@/types/dao";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setNowDate, setYearMonth } from "@/redux/featrues/nowDateSlice";
import dayjs from "dayjs";

const MonthPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const UserSWR = useSWR<User>(
    UrlBuilder(
      `/api/users/user/${session?.user?.id}`,
      session?.user?.id !== undefined
    ),
    DefaultFetcher
  );
  const FriendSWR = useSWR(
    UrlBuilder(
      `/api/users/friend/${UserSWR?.data?.id}`,
      UserSWR?.data?.id !== undefined
    ),
    DefaultFetcher
  );
  const UserScheduleSWR = useSWR<Schedule[]>(
    UrlBuilder(
      `/api/schedules/user/${session?.user?.docId}/${
        router.query.year as string
      }/${router.query.month as string}`,
      session?.user?.docId !== undefined &&
        router.query?.year !== undefined &&
        router.query?.month !== undefined
    ),
    DefaultFetcher
  );
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
            UserScheduleSWR.data?.length === 0 ? [] : UserScheduleSWR.data
          }
        />
      </div>
    </div>
  );
};
export default MonthPage;
