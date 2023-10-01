import UserBlock, {
  UserBlockProps,
} from "@/assets/Calendar/Drawer/UserBlock/UserBlock";
import styles from "./Friend.module.scss";
const mockUserBlockData: UserBlockProps[] = [
  {
    name: "q",
    email: "user234@google.com",
    image: "",
    withCheckButton: true,
  },
];
const FriendPage = () => {
  return (
    <div>
      <div>
        <div>친구 요청</div>
        {mockUserBlockData.map((item, index) => (
          <UserBlock
            key={index}
            {...item}
          />
        ))}
      </div>
      <div> 
        <div>친구 목록</div>
        <div></div>
      </div>
    </div>
  );
};

export default FriendPage;
