import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.scss";
import axios from "axios";
const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const timeId = useRef<NodeJS.Timeout>(setTimeout(() => {}));
  const request = async () => {
    return await axios.get(`/api/hello?query=${query}`);
  };
  useEffect(() => {
    clearTimeout(timeId.current);
    timeId.current = setTimeout(() => {
      request().then((res) => console.log(res.data));
    }, 1000);
  }, [query]);
  return (
    <div className={styles.container}>
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
  );
};

export default SearchBar;
