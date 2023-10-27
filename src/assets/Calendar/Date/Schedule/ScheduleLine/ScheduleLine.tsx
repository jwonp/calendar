import styles from "./ScheduleLine.module.scss";
import { useSession } from "next-auth/react";
interface ScheduleLineProps {
  text: string;
  userDocId:string;
}
const ScheduleLine = ({ text,userDocId }: ScheduleLineProps) => {
  const {data:session} = useSession();
  return (
    <div className={`${styles.container} ${userDocId === session?.user?.docId ? styles.user: ""}`}>
      <div className={styles.schedule}>{text}</div>
    </div>
  );
};

export default ScheduleLine;
