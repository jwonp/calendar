import FriendDrawer from "@/assets/Calendar/Drawer/FriendDrawer/FriendDrawer";
import MonthDetailGrid from "@/assets/Calendar/Grid/MonthDetailGrid";
import FriendPage from "@/components/PartialPages/Friend/Friend";
import MonthPage from "@/components/PartialPages/Month/Month";
import SchedulePage from "@/components/PartialPages/Schedule/Schedule";

const MonthDetailPage = () => {
  return (
    <MonthDetailGrid>
      <FriendDrawer>
        <FriendPage />
      </FriendDrawer>
      <MonthPage />
      <SchedulePage />
    </MonthDetailGrid>
  );
};

export default MonthDetailPage;
