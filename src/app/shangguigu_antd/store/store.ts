import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slices/user";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { headerSliceReducer } from "./slices/header";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    header: headerSliceReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
