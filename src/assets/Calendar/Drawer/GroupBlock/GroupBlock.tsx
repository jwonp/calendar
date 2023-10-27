import { Group, User } from "@/types/dao";
import styles from "./GroupBlock.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getSelectedGroup,
  setSelectedGroup,
} from "@/redux/featrues/groupSelectSlice";
interface GroupBlockProps extends Group {}
const GroupBlock = (group: GroupBlockProps) => {
  const dispatch = useAppDispatch();
  const selectedGroup = useAppSelector(getSelectedGroup);
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
      className={`${styles.container} ${
        group.docId === selectedGroup.docId ? styles.selected : ""
      }`}
      onClick={() => {
        dispatch(setSelectedGroup(group));
      }}>
      <div>{group.title}</div>
      <div>{memmberList(group.members)}</div>
    </div>
  );
};
export default GroupBlock;
