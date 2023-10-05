import FriendDrawer from "@/assets/Calendar/Drawer/FriendDrawer/FriendDrawer";
import MonthDetailGrid from "@/assets/Calendar/Grid/MonthDetailGrid";
import FriendPage from "@/components/PartialPages/Friend/Friend";
import MonthPage from "@/components/PartialPages/Month/Month";
import SchedulePage from "@/components/PartialPages/Schedule/Schedule";
import styles from "./index.module.scss";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}
interface Schedules {
  user: User;
  schedules: boolean[]; // ex) [true(00:00), ... false(23:45)]
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const MonthDetailPage = () => {
  const router = useRouter();
  const { data, error, mutate } = useSWR<Schedules>(
    `/api/schedule?year=${router.query.year}&month=${router.query.month}`,
    fetcher
  );
  return (
    <div className={styles.container}>
      <MonthDetailGrid>
        <FriendDrawer>
          <FriendPage />
        </FriendDrawer>
        <MonthPage />
        <SchedulePage />
      </MonthDetailGrid>
    </div>
  );
};

export default MonthDetailPage;
