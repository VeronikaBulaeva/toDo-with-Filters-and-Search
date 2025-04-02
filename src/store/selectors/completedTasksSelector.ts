import { createSelector } from "@reduxjs/toolkit";
import { toDoListSelector } from "@/store/toDoSlice.ts";

export const completedTasksSelector = createSelector(
  toDoListSelector,
  (items) => items.filter((item) => item.check),
);
