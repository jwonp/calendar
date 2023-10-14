import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import dayjs, { Dayjs } from "dayjs";
import { getDateDayJsFormat } from "@/utils/dateUtils";

export interface NowDateState {
  year: number;
  month: number;
  date: number;
}

const initialState: NowDateState = {
  year: dayjs().year(),
  month: dayjs().month() + 1,
  date: dayjs().date(),
};

type Date = { year: number; month: number; date: number };

export const nowDateSlice = createSlice({
  name: "nowDateSlice",
  initialState,
  reducers: {
    setNowDate: (state, action: PayloadAction<Date>) => {
      const year = action.payload.year;
      const month = action.payload.month;
      const date = action.payload.date;
      state.year = year;
      state.month = month;
      state.date = date;
    },
    setYearMonth: (state, action: PayloadAction<Omit<Date, "date">>) => {
      const year = action.payload.year;
      const month = action.payload.month;
      state.year = year;
      state.month = month;
    },
    setDate: (state, action: PayloadAction<number>) => {
      const date = action.payload;
      state.date = date;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNowDate, setDate, setYearMonth } = nowDateSlice.actions;
export const getNowDate = (state: RootState) => state.nowDate.year;
export const getDateAtNow = (state: RootState) => state.nowDate.date;
export const getMonthAtNow = (state: RootState) => state.nowDate.month;
export const getYearAtNow = (state: RootState) => state.nowDate.year;
export const getNowDateWithDayjs = createSelector(
  [getDateAtNow, getMonthAtNow, getYearAtNow],
  (date: number, month: number, year: number) => {
    return getDateDayJsFormat(year, month, date);
  }
);
export default nowDateSlice.reducer;
