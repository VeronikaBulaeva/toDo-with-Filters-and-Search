import { Box, Grid, Typography } from "@mui/material";
import Filter from "./components/Filter.tsx";
import ToDoInput from "./components/ToDoInput.tsx";
import ToDoList from "./components/ToDoList.tsx";
import { useAppSelector } from "./store/hooks.ts";
import { activeTasksSelector } from "./store/selectors/activeTasksSelector.ts";

function App() {
  const activeTasks = useAppSelector(activeTasksSelector);

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
        <Typography variant="subtitle2" mt={1}>
          Активные задачи: {activeTasks.length}
        </Typography>
        <ToDoList />
      </Box>
    </Grid>
  );
}

export default App;
