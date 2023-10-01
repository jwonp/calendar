import styles from "./ScheduleLine.module.scss";
interface ScheduleLineProps {
  text: string;
}
const ScheduleLine = ({ text }: ScheduleLineProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.schedule}>{text}</div>
    </div>
  );
};

export default ScheduleLine;
