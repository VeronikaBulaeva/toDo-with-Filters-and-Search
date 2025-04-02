import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import ToDoItem from "@/components/ToDoItem.tsx";
import { userEvent } from "@testing-library/user-event";

describe("TodoItem", () => {
  it("TodoItem editing", async () => {
    render(
      <Provider store={store}>
        <ToDoItem
          task={{
            text: "Сделать",
            id: 5,
            check: false,
          }}
          onClickDelete={vi.fn}
          onClickIconSave={() => vi.fn()}
          isCheck={false}
          handleChange={() => vi.fn()}
        />
      </Provider>,
    );
    const item = screen.getByText("Сделать");
    expect(item).toBeInTheDocument();
    const editButton = screen.getByTestId("edit");
    await userEvent.click(editButton);
    const input = screen.getByTestId("todoinput");
    expect(input).toBeInTheDocument();
  });
});
