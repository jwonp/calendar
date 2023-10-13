import UserBlock, {
  UserBlockProps,
} from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import styles from "./Friend.module.scss";
import { use, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar/SearchBar";
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
  const FriendSWR = useSWR(
    UrlBuilder(`/api/users/friend/${session?.user?.id}`),
    DefaultFetcher
  );
  useEffect(() => {
    console.log(FriendSWR.data);
  }, [FriendSWR.data]);
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <SearchBar />
      </div>
      <div className={styles.grid}>
        <div>친구 요청</div>
        {mockUserBlockData.map((item, index) => (
          <UserBlock
            key={index}
            {...item}
          />
        ))}
      </div>
      <div className={styles.grid}>
        <div>친구 목록</div>
        <div></div>
      </div>
    </div>
  );
};

export default FriendPage;
