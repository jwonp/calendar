export interface Date {
  year: number; // YYYY
  month: number; // 1~12
  date: number; // 1~31
  day: number; // 0(sun) ~ 6(sat)
}

export interface Schedule {
  userDocId: string;
  date: Date;
  schedule: boolean[]; //[true(00:00), ... , false(23:45)]
}

export interface FriendRequest {
  applicantDocId: string;
  isRejected: boolean;
  isAccepted: boolean;
}

export interface User {
  docId: string;
  id: string;
  name: string;
  email: string;
  picture: string;
  friends: string[];
}

export interface Group {
  docId: string;
  title: string;
  members: Omit<User, "friends">[];
}
