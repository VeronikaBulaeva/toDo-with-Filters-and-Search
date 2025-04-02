import { configureStore } from "@reduxjs/toolkit";
import toDo from "./toDoSlice";

export const store = configureStore({
  reducer: {
    toDo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
