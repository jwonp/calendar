import { Group } from "@/types/dao";
import styles from "./GroupBlock.module.scss";
interface GroupBlockProps extends Group {}
const GroupBlock = ({ title, members, docId }: GroupBlockProps) => {
  const memmberList = (members: string[]) => {
    let displayText = "";
    displayText = JSON.stringify(members);
    displayText
      .replaceAll(",", ", ")
      .replaceAll('"', " ")
      .replace("[", "")
      .replace("]", "");
    return displayText;
  };
  return (
    <div>
      <div>{title}</div>
      <div>{memmberList(members)}</div>
    </div>
  );
};
export default GroupBlock;
