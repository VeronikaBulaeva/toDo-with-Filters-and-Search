import { createSelector } from "@reduxjs/toolkit";
import { toDoListSelector } from "../toDoSlice.ts";

export const activeTasksSelector = createSelector(toDoListSelector, (items) =>
  items.filter((item) => !item.check),
);

export const completedTasksSelector = createSelector(
  toDoListSelector,
  (items) => items.filter((item) => item.check),
);
