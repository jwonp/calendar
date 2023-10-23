import Drawer from "@/assets/Calendar/Drawer/Drawer/Drawer";
import MonthDetailGrid from "@/assets/Calendar/Grid/MonthDetailGrid";
import FriendPage from "@/components/PartialPages/Friend/Friend";
import MonthPage from "@/components/PartialPages/Month/Month";
import SchedulePage from "@/components/PartialPages/Schedule/Schedule";
import styles from "./index.module.scss";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import GroupPage from "@/components/PartialPages/Group/Group";
import { useAppSelector } from "@/redux/hooks";
import { getDrawerPage } from "@/redux/featrues/drawerSwitchSlice";

const MonthDetailPage = () => {
  const router = useRouter();
  const drawerPage =useAppSelector(getDrawerPage)
  const { data: session } = useSession();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!session) {
      router.push("/");
    }
  }, [router.isReady, session]);
  return (
    <div className={styles.container}>
      <MonthDetailGrid>
        <Drawer>
          {drawerPage === "friend" ? <FriendPage /> : <GroupPage />}
        </Drawer>

        <MonthPage />
        <SchedulePage />
      </MonthDetailGrid>
    </div>
  );
};
3;
export default MonthDetailPage;
