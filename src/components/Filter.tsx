import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { debounce } from "@/utils/debouce.ts";
import {
  FilterType,
  setFilter,
  setType,
  typeSelector,
} from "../store/toDoSlice.ts";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";

const Filter = () => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(typeSelector);

  const onSearch = debounce((task) => {
    dispatch(setFilter(task.target.value));
  });

  const onSelectType = (type: FilterType) => () => {
    dispatch(setType(type));
  };

  return (
    <Paper
      component="form"
      sx={{
        pt: 0.5,
        width: 400,
        mt: 2,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Find item..."
        onChange={onSearch}
        fullWidth
        data-testid="search"
      />
      <Button
        color={type === "all" ? "primary" : "inherit"}
        onClick={onSelectType("all")}
        data-testid="all"
      >
        Все
      </Button>
      <Button
        color={type === "active" ? "primary" : "inherit"}
        onClick={onSelectType("active")}
        data-testid="active"
      >
        Активные
      </Button>
      <Button
        color={type === "completed" ? "primary" : "inherit"}
        onClick={onSelectType("completed")}
        data-testid="completed"
      >
        Выполненные
      </Button>
    </Paper>
  );
};
export default Filter;
