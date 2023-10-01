import styles from "./FriendDrawer.module.scss";
import { getFriendDrawerSwitch } from "@/redux/featrues/friendDrawerSwitchSlice";
import { useAppSelector } from "@/redux/hooks";
const FriendDrawer = ({ children }: { children: React.ReactNode }) => {
  const isFriendOn = useAppSelector(getFriendDrawerSwitch);
  if (isFriendOn) {
    return <div className={styles.container}>{children}</div>;
  }
  return <></>;
};

export default FriendDrawer;
