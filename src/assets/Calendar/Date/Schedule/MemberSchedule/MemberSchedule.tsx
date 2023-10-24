import { User } from "@/types/dao";
import styles from "./MemberSchedule.module.scss"
const MemberSchedule = (member: Omit<User, "friends">) => {
  return <div className={styles.container}>{member.name}</div>;
};
export default MemberSchedule;
