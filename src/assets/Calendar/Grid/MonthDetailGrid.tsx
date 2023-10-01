import { useAppSelector } from "@/redux/hooks";
import styles from "./MonthDetailGrid.module.scss";
import Provider from "@/redux/Provider";
import { getFriendDrawerSwitch } from "@/redux/featrues/friendDrawerSwitchSlice";

const MonthDetailGrid = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const friend = useAppSelector(getFriendDrawerSwitch);
  return (
    <div className={`${styles.conatainer} ${friend ? styles.isFriend : ""}`}>
      {children}
    </div>
  );
};

export default MonthDetailGrid;
