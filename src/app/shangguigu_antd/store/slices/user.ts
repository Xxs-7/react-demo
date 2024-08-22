import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoginUser } from "@/app/utils/StorageUtils";

export type UserState = {
  curUser: LoginUser;
};

export const initialState: UserState = {
  curUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurUser: (state: UserState, action: PayloadAction<UserState>) => {
      console.log("%c [ state ]-18", "font-size:13px; background:pink; color:#bf2c9f;", state);
      console.log("%c [ action ]-18", "font-size:13px; background:pink; color:#bf2c9f;", action);
      // const { accounts, isLock, password, currentAccount } = action.payload;
      state.curUser = action.payload.curUser;
      // state.accounts = accounts;
      // state.isLock = isLock;
      // state.password = password;
      // state.currentAccount = currentAccount;
    },
  },
});

export const selectCurUser = (state: RootState) => state.user.curUser;

export const { setCurUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
