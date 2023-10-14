import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { User } from "@/types/dao";
import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import { useSession } from "next-auth/react";

const SearchBar = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState<string>("");
  const [url, setUrl] = useState<string | null>("");
  const timeId = useRef<NodeJS.Timeout>(setTimeout(() => {}));
  const SearchSWR = useSWR<Omit<User, "docId" | "friends">[]>(
    url,
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
          <div className={styles.text}>친구 추가</div>
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
            <button className={styles.button}>전송</button>
          </div>
        </div>
      </div>
      {SearchSWR.data && SearchSWR.data.length > 0 && (
        <div className={styles.search_list_container}>
          <div className={styles.title}>검색 결과</div>
          <div>
            {SearchSWR.data
              .filter((user) => user.id !== session?.user?.id)
              .map((user, index) => (
                <UserBlock
                  key={index}
                  userId={user.id}
                  name={user.name}
                  email={user.email}
                  image={user.picture}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
