import UserBlock, {
  UserBlockProps,
} from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import styles from "./Friend.module.scss";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { User } from "@/types/dao";
import { RequestReply } from "@/types/dto";
import axios from "axios";
const mockUserBlockData: UserBlockProps[] = [
  {
    name: "q",
    email: "user234@google.com",
    image: "",
    withCheckButton: true,
  },
];
const FriendPage = () => {
  const { data: session } = useSession();

  const FriendSWR = useSWR<Omit<User, "friends" | "docId">[]>(
    UrlBuilder(
      `/api/users/friend/${session?.user?.id}`,
      session?.user?.id !== undefined
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
  useEffect(() => {
    console.log(session?.user?.docId);
    console.log(FriendRequestSWR.data);
  }, [FriendRequestSWR]);
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <SearchBar />
      </div>

      <div className={styles.grid}>
        <div>친구 요청</div>
        <div>
          {FriendRequestSWR.data &&
            FriendRequestSWR.data.map((friend, index) => (
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
            ))}
        </div>
      </div>

      <div className={styles.grid}>
        <div>친구 목록</div>
        <div>
          {FriendSWR.data &&
            FriendSWR.data.map((friend, index) => (
              <UserBlock
                key={index}
                userId={friend.id}
                name={friend.name}
                email={friend.email}
                image={friend.picture}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
