import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { User } from "@/types/dao";
import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import { useSession } from "next-auth/react";
import { FriendRequest } from "@/types/dto";
import axios from "axios";
import styles from "./InputBar.module.scss";
interface SearchProps {
  title: string;
}
const SearchBar = ({ title }: SearchProps) => {
  const { data: session } = useSession();
  const [query, setQuery] = useState<string>("");
  const [url, setUrl] = useState<string | null>("");
  const timeId = useRef<NodeJS.Timeout>(setTimeout(() => {}));
  const SearchSWR = useSWR<Omit<User, "friends">[]>(url, DefaultFetcher);
  const FriendSWR = useSWR<Omit<User, "friends">[]>(
    UrlBuilder(
      `/api/users/friend/${session?.user?.id}`,
      session?.user?.id !== undefined
    ),
    DefaultFetcher
  );
  useEffect(() => {
    clearTimeout(timeId.current);
    timeId.current = setTimeout(
      () =>
        setUrl(
          UrlBuilder(`/api/users/friend/search/${query}`, query.length > 0)
        ),
      1000
    );
  }, [query]);
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <div className={styles.title}>
          <div className={styles.text}>{title}</div>
        </div>
        <div className={styles.input_wrapper}>
          <div className={styles.input_box}>
            <input
              id="friend-search-input"
              className={styles.input}
              type="text"
              placeholder="구글 이메일을 입력하세요"
              onChange={(e) => {
                setQuery(() => e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {SearchSWR.data && SearchSWR.data.length > 0 && (
        <div className={styles.search_list_container}>
          <div className={styles.title}>검색 결과</div>
          <div>
            {SearchSWR.data
              .filter((user) => user.id !== session?.user?.id)
              .filter(
                (user) =>
                  FriendSWR.data?.find((friend) => friend.id == user.id) ===
                  undefined
              )
              .map((user, index) => (
                <UserBlock
                  key={index}
                  userId={user.id}
                  name={user.name}
                  email={user.email}
                  image={user.picture}
                  onClick={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => {
                    if (!session?.user?.docId || !user.id) {
                      return;
                    }
                    const request: FriendRequest = {
                      fromDocId: session?.user?.docId,
                      toDocId: user.docId,
                    };
                    axios
                      .post("/api/users/friend/request", request)
                      .then(() => {
                        SearchSWR.mutate();
                      });
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
