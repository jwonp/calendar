import Image from "next/image";
import styles from "./UserBlock.module.scss";
import OkIcon from "@public/ok-white.png";
import DenyIcon from "@public/deny-white.png";
export interface UserBlockProps {
  name: string;
  email: string;
  image: string;
  withCheckButton?: boolean;
}
const UserBlock = ({ name, email, image, withCheckButton }: UserBlockProps) => {
  return (
    <div className={styles.container}>
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

      {withCheckButton && (
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Image
              src={OkIcon}
              alt={""}
              fill
            />
          </div>
          <div className={styles.button}>
            <Image
              src={DenyIcon}
              alt={""}
              fill
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlock;
