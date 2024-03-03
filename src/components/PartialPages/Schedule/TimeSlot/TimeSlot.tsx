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
        // style={{
        //   gridTemplateColumns: groupMemberSchedule
        //     ? repeatGrid("1fr", groupMemberSchedule.length)
        //     : "1fr",
        // }}
      >
        {groupMemberSchedule
          ?.filter((_, index) => index < 4)
          .map((member, index) => {
            if (index === 3) {
              return (
                <MemberSchedule
                  key={`${timeIndex}-${index}`}
                  docId={""}
                  id={""}
                  name={`${member.name} 외 ${groupMemberSchedule.length - 4}명`}
                  email={""}
                  picture={""}></MemberSchedule>
              );
            }
            return (
              <MemberSchedule
                key={`${timeIndex}-${index}`}
                {...member}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TimeSlot;
