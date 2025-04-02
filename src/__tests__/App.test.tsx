import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import App from "@/App.tsx";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("App", () => {
  it("Добавление и удаление таски", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const input = screen.getByTestId("todoinput");
    await userEvent.type(input, "Дело 1");
    const saveButton = screen.getByTestId("save");
    await userEvent.click(saveButton);
    const task = screen.queryByText("Дело 1");
    expect(task).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete");
    await userEvent.click(deleteButton);
    expect(task).not.toBeInTheDocument();
  });

  it("Фильтрация по типу таски completed", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const input = screen.getByTestId("todoinput");
    await userEvent.type(input, "Дело 3");
    const saveButton = screen.getByTestId("save");
    await userEvent.click(saveButton);

    await userEvent.type(input, "Дело 4");
    await userEvent.click(saveButton);

    const checkbox = screen.getByTestId("Дело 4check");
    await userEvent.click(checkbox);

    const task3 = screen.getByText("Дело 3");
    const task4 = screen.getByText("Дело 4");

    const completedButton = screen.getByTestId("completed");
    await userEvent.click(completedButton);

    await waitFor(() => {
      expect(task3).not.toBeInTheDocument();
      expect(task4).toBeInTheDocument();
    });
    await userEvent.click(screen.getByTestId("all"));
  });

  it("Фильтрация по типу таски active", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const input = screen.getByTestId("todoinput");
    await userEvent.type(input, "Дело 5");
    const saveButton = screen.getByTestId("save");
    await userEvent.click(saveButton);

    await userEvent.type(input, "Дело 6");
    await userEvent.click(saveButton);

    const checkbox = screen.getByTestId("Дело 6check");
    await userEvent.click(checkbox);

    const task5 = screen.getByText("Дело 5");
    const task6 = screen.getByText("Дело 6");

    const activeButton = screen.getByTestId("active");
    await userEvent.click(activeButton);

    await waitFor(async () => {
      expect(task5).toBeInTheDocument();
      expect(task6).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("all"));
  });

  it("Фильтрация и поиск", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const input = screen.getByTestId("todoinput");
    await userEvent.type(input, "Дело 7");
    const saveButton = screen.getByTestId("save");
    await userEvent.click(saveButton);

    await userEvent.type(input, "Дело 8");
    await userEvent.click(saveButton);

    const task7 = screen.getByText("Дело 7");
    const task8 = screen.getByText("Дело 8");

    const searchInput = screen.getByTestId("search");
    await userEvent.type(searchInput, "Дело 7");
    await waitFor(() => {
      expect(task7).toBeInTheDocument();
      expect(task8).not.toBeInTheDocument();
    });
    await userEvent.type(searchInput, "Дело");
    cleanup();
  });
});
