import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "./Group.module.scss";
import { PAGE, setDrawerPage } from "@/redux/featrues/drawerSwitchSlice";
import GroupAddBar from "@/components/InputBar/GroupAddBar";
import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import { User } from "@/types/dao";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { UrlBuilder, DefaultFetcher } from "@/utils/SwrConfig";
import { useEffect, useMemo } from "react";
import {
  getGroupFriends,
  getGroupSelected,
  resetFriends,
  resetSelected,
  setFriends,
  addSelected,
  removeSelected,
} from "@/redux/featrues/groupSelectSlice";
import Image from "next/image";
import CheckIcon from "@public/ok-white.png";
const GroupPage = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const groupFriends = useAppSelector(getGroupFriends);
  const groupSelected = useAppSelector(getGroupSelected);
  const FriendSWR = useSWR<Omit<User, "friends" >[]>(
    UrlBuilder(
      `/api/users/friend/${session?.user?.id}`,
      session?.user?.id !== undefined
    ),
    DefaultFetcher
  );

  useEffect(() => {
    if (!FriendSWR.data) {
      dispatch(resetFriends());
      dispatch(resetSelected());
      return;
    }

    dispatch(setFriends(FriendSWR.data));
  }, [FriendSWR.data]);

  const FriendList = useMemo(() => {
    if (groupFriends.length === 0) {
      return <div>선택할 수 있는 친구가 없습니다</div>;
    }
    try {
      return groupFriends.map((friend, index) => {
        return (
          <div
            className={styles.box}
            key={index}>
            <UserBlock
              userId={friend.id}
              name={friend.name}
              email={friend.email}
              image={friend.picture}
            />
            <div
              className={`${styles.icon} ${
                groupSelected.find((e) => e.id === friend.id) !== undefined
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                if (
                  groupSelected.find((e) => e.id === friend.id) !== undefined
                ) {
                  dispatch(removeSelected(friend));
                  return;
                }

                dispatch(addSelected(friend));
              }}>
              {groupSelected.find((e) => e.id === friend.id) !== undefined && (
                <Image
                  src={CheckIcon}
                  alt={""}
                  fill
                />
              )}
            </div>
          </div>
        );
      });
    } catch {
      return <div>선택할 수 있는 친구가 없습니다</div>;
    }
  }, [groupFriends, groupSelected]);
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <GroupAddBar title="그룹 추가" />
      </div>
      <div
        className={styles.cancel}
        onClick={() => {
          dispatch(setDrawerPage(PAGE.FRIEND));
        }}>
        취소
      </div>
      <div className={styles.members}>
        <div className={styles.title}>멤버를 선택하세요</div>
        <div>{FriendList}</div>
      </div>
    </div>
  );
};

export default GroupPage;
