import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/types/dao";

export interface GroupSelectState {
  friends: Omit<User, "friends">[];
  selected: Omit<User, "friends">[];
}

const initialState: GroupSelectState = {
  friends: [],
  selected: [],
};

export const groupSelectSlice = createSlice({
  name: "groupSelect",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<Omit<User, "friends">[]>) => {
      if (JSON.stringify(state.friends) === JSON.stringify(action.payload)) {
        return;
      }
      state.friends = [...state.friends, ...action.payload];
    },
    addSelected: (state, action: PayloadAction<Omit<User, "friends">>) => {
      state.selected = [...state.selected, action.payload];
    },
    removeSelected: (state, action: PayloadAction<Omit<User, "friends">>) => {
      state.selected = [
        ...state.selected.filter((select) => select.id !== action.payload.id),
      ];
    },
    resetFriends: (state) => {
      state.friends = [];
    },
    resetSelected: (state) => {
      state.selected = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFriends,
  addSelected,
  removeSelected,
  resetFriends,
  resetSelected,
} = groupSelectSlice.actions;

export const getGroupSelect = (state: RootState) => state.groupSelect;
export const getGroupFriends = (state: RootState) => state.groupSelect.friends;
export const getGroupSelected = (state: RootState) =>
  state.groupSelect.selected;

export default groupSelectSlice.reducer;
