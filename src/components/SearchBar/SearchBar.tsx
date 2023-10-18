import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import useSWR from "swr";
import { DefaultFetcher, UrlBuilder } from "@/utils/SwrConfig";
import { User } from "@/types/dao";
import UserBlock from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import { useSession } from "next-auth/react";
import { FriendRequest } from "@/types/dto";
import axios from "axios";
interface SearchProps {
  submitButtonText?: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const SearchBar = ({ submitButtonText, onSubmit }: SearchProps) => {
  const { data: session } = useSession();
  const [query, setQuery] = useState<string>("");
  const [url, setUrl] = useState<string | null>("");
  const timeId = useRef<NodeJS.Timeout>(setTimeout(() => {}));
  const SearchSWR = useSWR<Omit<User, "friends">[]>(url, DefaultFetcher);

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
          <div
            className={`${styles.input_box} ${
              submitButtonText && onSubmit ? styles.grid : undefined
            }`}>
            <input
              id="friend-search-input"
              className={styles.input}
              type="text"
              placeholder="구글 이메일을 입력하세요"
              onChange={(e) => {
                setQuery(() => e.target.value);
              }}
            />
            {submitButtonText && onSubmit && (
              <button
                className={styles.button}
                onClick={onSubmit}>
                {submitButtonText}
              </button>
            )}
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
