import Image from "next/image";
import styles from "./UserBlock.module.scss";
import OkIcon from "@public/ok-white.png";
import DenyIcon from "@public/deny-white.png";
import { use, useEffect, useState } from "react";
export interface UserBlockProps {
  userId?: string;
  name: string;
  email: string;
  image: string;

  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const UserBlock = ({
  userId,
  name,
  email,
  image,

  onClick,
  onSubmit,
  onCancel,
}: UserBlockProps) => {
  return (
    <div
      className={`${styles.container} ${
        !onSubmit && !onCancel ? styles.noButtons : ""
      } ${onClick ? styles.pointer : ""}`}
      onClick={onClick}>
      <div className={`${styles.button} ${styles.circle}`}>
        <Image
          src={image}
          alt={""}
          fill
        />
      </div>
      <div>
        <div>{name}</div>
        <div>{email}</div>
      </div>

      {onSubmit || onCancel ? (
        <div className={styles.buttons}>
          {onSubmit && (
            <div
              className={styles.button}
              onClick={onSubmit}>
              <Image
                src={OkIcon}
                alt={""}
                fill
              />
            </div>
          )}
          {onCancel && (
            <div
              className={styles.button}
              onClick={onCancel}>
              <Image
                src={DenyIcon}
                alt={""}
                fill
              />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserBlock;
