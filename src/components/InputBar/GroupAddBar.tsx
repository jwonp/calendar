import { useState } from "react";
import { useSession } from "next-auth/react";
import { Group } from "@/types/dto";
import axios from "axios";
import styles from "./InputBar.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getGroupSelected,
  resetFriends,
  resetSelected,
} from "@/redux/featrues/groupSelectSlice";
import { PAGE, setDrawerPage } from "@/redux/featrues/drawerSwitchSlice";
interface GroupAddBarProps {
  title: string;
}
const GroupAddBar = ({ title }: GroupAddBarProps) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [groupTitle, setGroupTitle] = useState<string>("");
  const groupSelected = useAppSelector(getGroupSelected);

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <div className={styles.title}>
          <div className={styles.text}>{title}</div>
        </div>
        <div className={styles.input_wrapper}>
          <div className={`${styles.input_box} ${styles.grid}`}>
            <input
              id="group-add-input"
              className={styles.input}
              type="text"
              placeholder="그룹 이름을 입력하세요"
              onChange={(e) => {
                setGroupTitle(() => e.target.value);
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                if (!session?.user?.docId) {
                  return;
                }
                const newGroup: Group = {
                  host: session?.user?.docId,
                  title: groupTitle,
                  members: groupSelected.map((selected) => selected.docId),
                };
                axios.post("/api/groups/group", newGroup).then((res) => {
                  if (Object.keys(res.data).includes("docId")) {
                    dispatch(resetFriends);
                    dispatch(resetSelected);
                    dispatch(setDrawerPage(PAGE.FRIEND));
                  }
                });
              }}>
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupAddBar;
