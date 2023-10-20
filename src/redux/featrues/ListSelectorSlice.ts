import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const LIST = {
  FRIEND: "friend",
  GROUP: "group",
} as const;
export type List = (typeof LIST)[keyof typeof LIST];
export interface ListSelectorState {
  list: List;
}

const initialState: ListSelectorState = {
  list: LIST.FRIEND,
};

export const listSelectorSlice = createSlice({
  name: "listSelector",
  initialState,
  reducers: {
    setListSelector: (state, action: PayloadAction<List>) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListSelector } = listSelectorSlice.actions;

export const getListSelector = (state: RootState) => state.listSelector.list;

export default listSelectorSlice.reducer;
