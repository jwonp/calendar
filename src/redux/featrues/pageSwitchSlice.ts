import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export const PAGE = {
  MONTH: "month",
  DATE: "date",

} as const;
type Page = (typeof PAGE)[keyof typeof PAGE];
interface PageSwitchState {
  page: Page;
}

const initialState: PageSwitchState = {
  page: PAGE.MONTH,
};

export const pageSwitchSlice = createSlice({
  name: "pageSwitchSlice",
  initialState,
  reducers: {
    setPageToMonth: (state) => {
      state.page = PAGE.MONTH;
    },
    setPageToDate: (state) => {
      state.page = PAGE.DATE;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setPageToMonth, setPageToDate } =
  pageSwitchSlice.actions;
export const getPageSwitch = (state: RootState) => state.pageSwitch.page;
export default pageSwitchSlice.reducer;
