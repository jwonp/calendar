import { User } from "@/types/dao";
import styles from "./TimeSlot.module.scss";
import MemberSchedule from "@/assets/Calendar/Date/Schedule/MemberSchedule/MemberSchedule";
import { repeatGrid } from "@/utils/stringUtils";
interface TimeSlotProps {
  time: string;
  timeIndex: number;
  selected: boolean;
  handleTimeSelection: (timeIndex: number) => void;
  handleMouseEnter: (timeIndex: number) => void;
  groupMemberSchedule: Omit<User, "friends">[] | undefined;
}
const TimeSlot = ({
  time,
  timeIndex,
  selected,
  handleTimeSelection,
  handleMouseEnter,
  groupMemberSchedule,
}: TimeSlotProps) => {
  return (
    <div
      className={`${styles.timeSlot} ${selected ? styles.selected : ""}`}
      onClick={() => handleTimeSelection(timeIndex)}
      onMouseEnter={() => handleMouseEnter(timeIndex)}>
      <div className={styles.time}></div>
      <div
        className={styles.members}
        style={{
          gridTemplateColumns: groupMemberSchedule
            ? repeatGrid("1fr", groupMemberSchedule.length)
            : "1fr",
        }}>
        {groupMemberSchedule?.map((member, index) => (
          <MemberSchedule
            key={`${timeIndex}-${index}`}
            {...member}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
