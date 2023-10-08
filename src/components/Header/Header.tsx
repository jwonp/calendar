import dayjs from "dayjs";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackIcon from "@public/back-white.png";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getFriendDrawerSwitch,
  setSwitch,
} from "@/redux/featrues/friendDrawerSwitchSlice";
import Link from "next/link";
const Header = () => {
  const now = dayjs();
  const router = useRouter();

  const isFriendOn = useAppSelector(getFriendDrawerSwitch);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    if (Object.keys(router.query).includes("year") === false) {
      return;
    }
    setYear(parseInt(router.query.year as string));
  }, [router.query]);

  return (
    <header className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.left}>
          {Object.keys(router.query).includes("year") && (
            <Link
              className={styles.back}
              href={`/years?year=${year}`}>
              <div className={styles.icon}>
                <Image
                  src={BackIcon}
                  alt={""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.text}>{`${year}년`}</div>
            </Link>
          )}
        </div>

        <div className={styles.center}>
          {router.pathname.includes("years") && (
            <div>
              <a href={`/years#year${now.year()}`}>오늘</a>
            </div>
          )}
          {Object.keys(router.query).includes("month") && (
            <div
              onClick={() => {
                dispatch(setSwitch(!isFriendOn));
              }}>
              친구 목록
            </div>
          )}
          {/* <div
            onClick={() => {
              axios.get("/api/user/friend").then((res) => {
                console.log(res.data);
              });
            }}>
            {session?.user?.name}
          </div> */}
        </div>
        <div className={styles.right}>
          {session?.user ? (
            <div
              onClick={() => {
                signOut();
              }}>
              로그아웃
            </div>
          ) : (
            <div
              onClick={() => {
                signIn();
              }}>
              로그인
            </div>
          )}
          <div className={styles.icon}>
            <Image
              src={session?.user?.image as string}
              alt={""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
