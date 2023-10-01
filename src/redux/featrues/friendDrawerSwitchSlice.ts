import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FriendDrawerSwitchState {
  switch: boolean;
}

const initialState: FriendDrawerSwitchState = {
  switch: false,
};

export const friendDrawerSwitchSlice = createSlice({
  name: "friendDrawerSwitch",
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
  },
});

// Action creators are generated for each case reducer function
export const { turnOn, turnOff, setSwitch } = friendDrawerSwitchSlice.actions;
export const getFriendDrawerSwitch = (state: RootState) =>
  state.friendDrawerSwitch.switch;
export default friendDrawerSwitchSlice.reducer;
