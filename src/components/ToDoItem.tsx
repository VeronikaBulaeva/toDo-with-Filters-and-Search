import { FC, useState } from "react";
import { ToDoItemProps } from "./types.ts";
import ToDoInput from "./ToDoInput.tsx";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ToDoItem: FC<ToDoItemProps> = ({
  task,
  onClickDelete,
  onClickIconSave,
  isCheck,
  handleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = (value: boolean) => {
    setIsEditing(value);
  };

  return (
    <>
      {isEditing ? (
        <ToDoInput
          value={task.text}
          onClickIconSave={(text: string) => {
            onClickIconSave(task.id, text);
            handleEditing(false);
          }}
          onClickCancel={() => {
            handleEditing(false);
          }}
        />
      ) : (
        <FormGroup row>
          <FormControlLabel
            sx={{ textDecoration: isCheck ? "line-through" : "none" }}
            control={
              <Checkbox
                data-testid={`${task.text}check`}
                name="react"
                checked={isCheck}
                onChange={() => {
                  handleChange(task);
                }}
              />
            }
            label={task.text}
          />
          <IconButton
            type="button"
            sx={{ p: 1.5 }}
            onClick={() => {
              handleEditing(true);
            }}
            data-testid="edit"
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: 1.5 }}
            onClick={onClickDelete}
            data-testid="delete"
          >
            <DeleteIcon />
          </IconButton>
        </FormGroup>
      )}
    </>
  );
};

export default ToDoItem;
