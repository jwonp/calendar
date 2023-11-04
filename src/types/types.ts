import { Schedule, User } from "./dao";

export interface Error {
  message: string;
}

export interface ScheduleWithUserDetail extends Omit<Schedule,"userDocId"> {
  user:Omit<User, "friends">
}