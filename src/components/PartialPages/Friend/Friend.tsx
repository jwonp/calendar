import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import styles from "./Friend.module.scss";
import { useMemo } from "react";

import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Group, User } from "@/types/dao";
import { RequestReply } from "@/types/dto";
import axios from "axios";
import ListSelectButton from "@/assets/Calendar/Drawer/ListSelectButton/ListSelectButton";
import { LIST, getListSelector } from "@/redux/featrues/ListSelectorSlice";
import { useAppSelector } from "@/redux/hooks";
import GroupBlock from "@/assets/Calendar/Drawer/GroupBlock/GroupBlock";

const FriendPage = () => {
  const { data: session } = useSession();
  const listSelector = useAppSelector(getListSelector);
  const FriendSWR = useSWR<Omit<User, "friends" | "docId">[]>(
    UrlBuilder(
      `/api/users/friend/${session?.user?.id}`,
      session?.user?.id !== undefined
    ),
    DefaultFetcher
  );
  const GroupSWR = useSWR<Group[]>(
    UrlBuilder(
      `/api/groups/group/${session?.user?.docId}`,
      session?.user?.docId !== undefined
    ),
    DefaultFetcher
  );
  const FriendRequestSWR = useSWR<Omit<User, "friends">[]>(
    UrlBuilder(
      `/api/users/friend/request/${session?.user?.docId}`,
      session?.user?.docId !== undefined
    ),
    DefaultFetcher
  );
  const FriendRequestBlocks = useMemo(() => {
    if (FriendRequestSWR.data === undefined) {
      return (
        <div className={styles.noContent}>친구 신청 목록이 비어있습니다</div>
      );
    }
    try {
      return FriendRequestSWR.data.map((friend, index) => (
        <UserBlock
          key={index}
          userId={friend.id}
          name={friend.name}
          email={friend.email}
          image={friend.picture}
          onSubmit={() => {
            if (!session?.user?.docId || !friend.docId) {
              return;
            }
            const requestReply: RequestReply = {
              userDocId: session?.user?.docId,
              applicantDocId: friend.docId,
              isRejected: false,
              isAccepted: true,
            };
            axios.patch("/api/users/friend/request", requestReply);
          }}
          onCancel={() => {
            if (!session?.user?.docId || !friend.docId) {
              return;
            }
            const requestReply: RequestReply = {
              userDocId: session?.user?.docId,
              applicantDocId: friend.docId,
              isRejected: true,
              isAccepted: false,
            };
            axios.patch("/api/users/friend/request", requestReply);
          }}
        />
      ));
    } catch {
      return (
        <div className={styles.noContent}>친구 신청 목록이 비어있습니다</div>
      );
    }
  }, [FriendRequestSWR]);
  const GroupList = useMemo(() => {
    if (GroupSWR.data === undefined) {
      return <div className={styles.noContent}>그룹 목록이 비어있습니다</div>;
    }
    try {
      return GroupSWR.data.map((group, index) => (
        <GroupBlock
          key={index}
          docId={group.docId}
          title={group.title}
          members={group.members}
        />
      ));
    } catch {
      return <div className={styles.noContent}>그룹 목록이 비어있습니다</div>;
    }
  }, [GroupSWR]);
  const FriendList = useMemo(() => {
    if (FriendSWR.data === undefined) {
      return <div className={styles.noContent}>친구 목록이 비어있습니다</div>;
    }
    try {
      return FriendSWR.data.map((friend, index) => (
        <UserBlock
          key={index}
          userId={friend.id}
          name={friend.name}
          email={friend.email}
          image={friend.picture}
        />
      ));
    } catch {
      return <div className={styles.noContent}>친구 목록이 비어있습니다</div>;
    }
  }, [FriendSWR]);
  const ListBlocks = useMemo(() => {
    if (listSelector === LIST.FRIEND) {
      return FriendList;
    }
    return GroupList;
  }, [listSelector, FriendList, GroupList]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <SearchBar />
      </div>

      <div className={styles.grid}>
        <div>친구 요청</div>
        <div>{FriendRequestBlocks}</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.buttons}>
          <ListSelectButton
            text={"친구 목록"}
            selector={LIST.FRIEND}
          />
          <ListSelectButton
            text={"그룹 목록"}
            selector={LIST.GROUP}
          />
        </div>
        <div>{ListBlocks}</div>
      </div>
    </div>
  );
};

export default FriendPage;
