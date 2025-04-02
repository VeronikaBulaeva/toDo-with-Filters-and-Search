import { Box, Button, Grid, Typography } from "@mui/material";
import Filter from "./components/Filter.tsx";
import ToDoInput from "./components/ToDoInput.tsx";
import ToDoList from "./components/ToDoList.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import {
  activeTasksSelector,
  completedTasksSelector,
} from "./store/selectors/activeTasksSelector.ts";
import { deleteToDo } from "@/store/toDoSlice.ts";

function App() {
  const activeTasks = useAppSelector(activeTasksSelector);
  const completedTasks = useAppSelector(completedTasksSelector);
  const dispatch = useAppDispatch();

  const deleteCompletedTasks = () => {
    completedTasks.map((task) => {
      dispatch(deleteToDo(task.id));
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{
        minHeight: "100vh",
      }}
    >
      <Box
        p={4}
        pb={8}
        style={{
          minHeight: "400px",
          maxWidth: "max-content",
          backgroundColor: "#e7e1d7",
          borderRadius: "4px",
        }}
      >
        <Typography data-testid="toDoListText" variant="h4" mt={4} mb={2}>
          ToDo-List
        </Typography>
        <Filter />
        <ToDoInput />

        <Grid display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" mt={1}>
            Активные задачи: {activeTasks.length}
          </Typography>
          <Button color="primary" onClick={deleteCompletedTasks}>
            Удалить выполненные
          </Button>
        </Grid>
        <ToDoList />
      </Box>
    </Grid>
  );
}

export default App;
