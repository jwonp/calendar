import { useAppSelector } from "@/redux/hooks";
import styles from "./MonthDetailGrid.module.scss";

import { getDrawerSwitch } from "@/redux/featrues/drawerSwitchSlice";

const MonthDetailGrid = ({ children }: { children: React.ReactNode }) => {
  const friend = useAppSelector(getDrawerSwitch);
  return (
    <div className={`${styles.conatainer} ${friend ? styles.isFriend : ""}`}>
      {children}
    </div>
  );
};

export default MonthDetailGrid;
