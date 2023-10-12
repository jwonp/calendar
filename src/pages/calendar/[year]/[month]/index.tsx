import FriendDrawer from "@/assets/Calendar/Drawer/FriendDrawer/FriendDrawer";
import MonthDetailGrid from "@/assets/Calendar/Grid/MonthDetailGrid";
import FriendPage from "@/components/PartialPages/Friend/Friend";
import MonthPage from "@/components/PartialPages/Month/Month";
import SchedulePage from "@/components/PartialPages/Schedule/Schedule";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MonthDetailPage = () => {
  const router = useRouter();
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
