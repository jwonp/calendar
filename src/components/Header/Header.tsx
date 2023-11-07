import dayjs from "dayjs";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackIcon from "@public/back-white.png";
import { signIn, signOut, useSession } from "next-auth/react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDrawerSwitch, setSwitch } from "@/redux/featrues/drawerSwitchSlice";
import Link from "next/link";
import { getDateAtNow } from "@/redux/featrues/nowDateSlice";
import {
  setPageToDate,
  setPageToMonth,
} from "@/redux/featrues/pageSwitchSlice";
import UserIcon from "@public/users-white.png";
const Header = () => {
  const now = dayjs();
  const router = useRouter();
  const isFriendOn = useAppSelector(getDrawerSwitch);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [year, setYear] = useState<number>(0);
  const dateAtNow = useAppSelector(getDateAtNow);
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
              <a
                className={styles.text}
                href={`/years#year${now.year()}`}>
                오늘
              </a>
            </div>
          )}
          {Object.keys(router.query).includes("month") && (
            <div
              className={styles.text}
              onClick={() => {
                dispatch(setSwitch(!isFriendOn));
              }}>
              친구 목록
            </div>
          )}
          {Object.keys(router.query).includes("month") && (
            <div className={styles.indicator}>
              <div
                className={styles.text}
                onClick={() => {
                  dispatch(setPageToMonth());
                }}>{`${router.query.month as string}월`}</div>
              <div
                className={styles.text}
                onClick={() => {
                  dispatch(setPageToDate());
                }}>{`${dateAtNow}일`}</div>
            </div>
          )}
        </div>
        <div className={styles.right}>
          {session?.user ? (
            <div
              className={styles.text}
              onClick={() => {
                signOut();
              }}>
              로그아웃
            </div>
          ) : (
            <div
              className={styles.text}
              onClick={() => {
                signIn("cognito");
              }}>
              로그인
            </div>
          )}
          <div className={styles.icon}>
            <Image
              src={(session?.user?.image as string) ?? UserIcon}
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
