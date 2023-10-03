import CalendarYearPage from "@/components/Pages/years/Years";
import styles from "./years.module.scss";
const YearsPage = () => {
  return (
    <div className={styles.container}>
      <CalendarYearPage />
    </div>
  );
};

export default YearsPage;
