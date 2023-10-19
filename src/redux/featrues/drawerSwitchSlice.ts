import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const PAGE = {
  FRIEND: "friend",
  GROUP: "group",
} as const;
type Page = (typeof PAGE)[keyof typeof PAGE];
export interface DrawerSwitchState {
  switch: boolean;
  page: Page;
}

const initialState: DrawerSwitchState = {
  switch: false,
  page: PAGE.FRIEND,
};

export const drawerSwitchSlice = createSlice({
  name: "drawerSwitch",
  initialState,
  reducers: {
    turnOn: (state) => {
      state.switch = true;
    },
    turnOff: (state) => {
      state.switch = false;
    },
    setSwitch: (state, action: PayloadAction<boolean>) => {
      state.switch = action.payload;
    },
    setDrawerPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { turnOn, turnOff, setSwitch, setDrawerPage } =
  drawerSwitchSlice.actions;
export const getDrawerSwitch = (state: RootState) => state.drawerSwitch.switch;
export const getDrawerPage = (state: RootState) => state.drawerSwitch.page;
export default drawerSwitchSlice.reducer;
