import { FC, PropsWithChildren, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import {
  deleteToDo,
  filterSelector,
  handleChangeText,
  handleCheck,
  toDoListSelector,
  typeSelector,
} from "../store/toDoSlice.ts";
import { TaskType } from "./types.ts";
import { Grid } from "@mui/material";
import ToDoItem from "./ToDoItem.tsx";

const ToDoList: FC<PropsWithChildren> = ({ children }) => {
  const tasks = useAppSelector(toDoListSelector);
  const type = useAppSelector(typeSelector);
  const search = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  const handleChange = (e: TaskType) => {
    dispatch(handleCheck(e));
  };

  const handleUpdateText = (id: number, text: string) => {
    dispatch(handleChangeText({ id, text }));
  };

  const filterByType = useCallback(
    (task: TaskType) => {
      switch (type) {
        case "all":
          return true;
        case "active":
          return !task.check;
        case "completed":
          return task.check;
      }
    },
    [type],
  );

  const filteredTasks = useCallback(
    () =>
      tasks.filter(
        (task) =>
          task.text.toLowerCase().includes(search.toLowerCase()) &&
          filterByType(task),
      ),
    [tasks, search, filterByType],
  );

  return (
    <Grid container direction="column" gap={2} mt={2}>
      {children}
      {filteredTasks().map((task) => (
        <ToDoItem
          task={task}
          key={task.id}
          onClickDelete={() => {
            dispatch(deleteToDo(task.id));
          }}
          onClickIconSave={handleUpdateText}
          isCheck={task.check}
          handleChange={handleChange}
        />
      ))}
    </Grid>
  );
};

export default ToDoList;
