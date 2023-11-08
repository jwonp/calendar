import Image from "next/image";
import styles from "./UserBlock.module.scss";
import OkIcon from "@public/ok-white.png";
import DenyIcon from "@public/deny-white.png";
import TrashCanIcon from "@public/trash-can-white.png";

export interface UserBlockProps {
  userId?: string;
  name: string;
  email: string;
  image: string;

  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSubmit?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const UserBlock = ({
  userId,
  name,
  email,
  image,

  onClick,
  onSubmit,
  onCancel,
  onDelete,
}: UserBlockProps) => {
  return (
    <div
      className={`${styles.container} ${
        !onDelete && !onSubmit && !onCancel ? styles.noButtons : ""
      } ${onClick ? styles.pointer : ""}`}
      onClick={onClick}>
      <div className={`${styles.button} ${styles.circle}`}>
        <Image
          src={image}
          alt={""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <div>{name}</div>
        <div>{email}</div>
      </div>
      {onDelete ? (
        <div
          className={styles.button}
          onClick={onDelete}>
          <Image
            src={TrashCanIcon}
            alt={""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <></>
      )}
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
