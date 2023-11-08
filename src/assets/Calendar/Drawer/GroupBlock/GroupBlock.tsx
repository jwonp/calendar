import { Group, User } from "@/types/dao";
import styles from "./GroupBlock.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getSelectedGroup,
  setSelectedGroup,
} from "@/redux/featrues/groupSelectSlice";
import Image from "next/image";
import TrashCanIcon from "@public/trash-can-white.png";
import axios from "axios";
import { GroupDeleteRequest } from "@/types/dto";
import { useSession } from "next-auth/react";
interface GroupBlockProps extends Group {}
const GroupBlock = (group: GroupBlockProps) => {
  const { data: session } = useSession();
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
      <div>
        <div>{group.title}</div>
        <div>{memmberList(group.members)}</div>
      </div>
      <div
        className={styles.button}
        onClick={() => {
          const deleteRequest: GroupDeleteRequest = {
            groupDocId: group.docId,
            memberDocId: session?.user?.docId as string,
          };
          axios.delete("/api/groups/group", { data: deleteRequest });
        }}>
        <Image
          src={TrashCanIcon}
          alt={""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};
export default GroupBlock;
