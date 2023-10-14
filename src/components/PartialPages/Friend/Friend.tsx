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
    UrlBuilder(`/api/users/friend/${session?.user?.id}`),
    DefaultFetcher
  );
  const FriendRequestSWR = useSWR<Omit<User, "friends">[]>(
    UrlBuilder(`/api/users/friend/request/${session?.user?.docId}`)
  );
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
