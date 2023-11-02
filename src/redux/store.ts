import { configureStore } from "@reduxjs/toolkit";
import drawerSwitchReducer from "./featrues/drawerSwitchSlice";
import nowDateReducer from "./featrues/nowDateSlice";
import listSelectorReducer from "./featrues/ListSelectorSlice";
import groupSelectReducer from "./featrues/groupSelectSlice";
import pageSwitchReducer from "./featrues/pageSwitchSlice";
export const store = configureStore({
  reducer: {
    drawerSwitch: drawerSwitchReducer,
    nowDate: nowDateReducer,
    listSelector: listSelectorReducer,
    groupSelect: groupSelectReducer,
    pageSwitch:pageSwitchReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
