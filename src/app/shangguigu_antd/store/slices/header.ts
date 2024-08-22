import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type HeaderState = {
  title: string;
};

export const initialState: HeaderState = {
  title: "首页",
};

export const headerSlice = createSlice({
  name: "head",
  initialState,
  reducers: {
    setHeaderTitle: (state: HeaderState, action: PayloadAction<HeaderState>) => {
      state.title = action.payload.title;
    },
  },
});

export const selectHeaderTitle = (state: RootState) => state.header;

export const { setHeaderTitle } = headerSlice.actions;
export const headerSliceReducer = headerSlice.reducer;
