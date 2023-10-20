import styles from "./Drawer.module.scss";
import { getDrawerSwitch } from "@/redux/featrues/drawerSwitchSlice";
import { useAppSelector } from "@/redux/hooks";
const FriendDrawer = ({ children }: { children: React.ReactNode }) => {
  const isFriendOn = useAppSelector(getDrawerSwitch);
  if (isFriendOn) {
    return <div className={styles.container}>{children}</div>;
  }
  return <></>;
};

export default FriendDrawer;
