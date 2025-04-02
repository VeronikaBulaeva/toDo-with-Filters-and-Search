export type TaskType = {
  text: string;
  id: number;
  check: boolean;
};

export type ToDoInputType = {
  onClickIconSave?: (value: string) => void;
  onClickCancel?: () => void;
  value?: string;
};

export interface ToDoItemProps {
  task: TaskType;
  onClickDelete: () => void;
  onClickIconSave: (id: number, text: string) => void;
  isCheck: boolean;
  handleChange: (task: TaskType) => void;
}
