import { Group, User } from "@/types/dao";
import styles from "./GroupBlock.module.scss";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedGroup} from "@/redux/featrues/groupSelectSlice";
interface GroupBlockProps extends Group {}
const GroupBlock = (group: GroupBlockProps) => {
  const dispatch = useAppDispatch();
  const memmberList = (members: Omit<User, "friends">[]) => {
    let displayText = "";
    const memberNames = members.map((member) => member.name);
    const displayMemberNames = memberNames
      .filter((_, index) => index < 3)
      .filter((_, index) => index < 3);
    displayText = JSON.stringify(displayMemberNames);
    displayText = displayText
      .replaceAll(",", ", ")
      .replaceAll('"', " ")
      .replace("[", "")
      .replace("]", "");
    if (memberNames.length > 3) {
      return `${displayText} 외 ${memberNames.length - 3}명`;
    }
    return displayText;
  };
  return (
    <div
      className={styles.container}
      onClick={() => {
        dispatch(setSelectedGroup(group));
      }}>
      <div>{group.title}</div>
      <div>{memmberList(group.members)}</div>
    </div>
  );
};
export default GroupBlock;
