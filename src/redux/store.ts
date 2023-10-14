import { configureStore } from "@reduxjs/toolkit";
import friendDrawerSwitchReducer from "./featrues/friendDrawerSwitchSlice";
import nowDateReducer from "./featrues/nowDateSlice";

export const store = configureStore({
  reducer: {
    friendDrawerSwitch: friendDrawerSwitchReducer,
    nowDate:nowDateReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
