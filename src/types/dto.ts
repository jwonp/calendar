import { User, FriendRequest as FriendRequestDAO } from "./dao";
export interface UserDetail {
  id: string;
  name: string;
  email: string;
  picture: string;
  friends: string[];
  docId: string;
}
export interface Friend extends Omit<User, "docId" | "friends"> {}
export interface FriendRequest {
  fromDocId: string;
  toDocId: string;
}
export interface RequestReply extends FriendRequestDAO {
  userDocId: string;
}
export interface Group {
  host: string;
  title: string;
}

export interface Schedule {
  userDocId: string;
  year: number; // YYYY
  month: number; // 1~12
  date: number; // 1~31
  day: number; // 0(sun) ~ 6(sat)
  schedule: boolean[];
}
