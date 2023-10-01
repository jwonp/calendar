import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignedIn = () => {
  const router = useRouter();
  const now = dayjs();
  useEffect(() => {
    router.push(`/calendar/${now.year()}/${now.month() + 1}`);
  }, []);
  return <div></div>;
};

export default SignedIn;
