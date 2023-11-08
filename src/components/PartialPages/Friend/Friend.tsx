import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import styles from "./Friend.module.scss";
import { useMemo } from "react";
import Image from "next/image";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/InputBar/SearchBar";
import { Group, User } from "@/types/dao";
import { FriendDeleteRequest, RequestReply } from "@/types/dto";
import axios, { AxiosResponse } from "axios";
import ListSelectButton from "@/assets/Calendar/Drawer/ListSelectButton/ListSelectButton";
import { LIST, getListSelector } from "@/redux/featrues/ListSelectorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import GroupBlock from "@/assets/Calendar/Drawer/GroupBlock/GroupBlock";
import AddIcon from "@public/add.png";
import { PAGE, setDrawerPage } from "@/redux/featrues/drawerSwitchSlice";

const FriendPage = () => {
  const { data: session } = useSession();
  const listSelector = useAppSelector(getListSelector);
  const dispatch = useAppDispatch();
  const FriendSWR = useSWR<Omit<User, "friends">[]>(
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
    if (
      FriendRequestSWR.data === undefined ||
      FriendRequestSWR.data.length === 0
    ) {
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
    if (GroupSWR.data === undefined || GroupSWR.data.length === 0) {
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
    if (FriendSWR.data === undefined || FriendSWR.data.length === 0) {
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
          onDelete={() => {
            const deleteRequest: FriendDeleteRequest = {
              userDocId: session?.user?.docId as string,
              friendId: friend.id,
            };
            axios
              .delete(`/api/users/friend/request`, { data: deleteRequest })
              .then((res: AxiosResponse) => {
                if (res.status === 200) {
                  FriendSWR.mutate();
                }
              });
          }}
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
        <SearchBar title={"친구 추가"} />
      </div>

      <div className={styles.grid}>
        <div>친구 요청</div>
        <div>{FriendRequestBlocks}</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.buttons}>
          <div>
            <ListSelectButton
              text={"친구 목록"}
              selector={LIST.FRIEND}
            />
            <ListSelectButton
              text={"그룹 목록"}
              selector={LIST.GROUP}
            />
          </div>
          <div>
            <div
              className={styles.icon}
              onClick={() => {
                dispatch(setDrawerPage(PAGE.GROUP));
              }}>
              <Image
                src={AddIcon}
                alt={""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
        <div>{ListBlocks}</div>
      </div>
    </div>
  );
};

export default FriendPage;
