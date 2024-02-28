import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { enableFetchMocks } from "jest-fetch-mock";
import { RouterProvider } from "react-router-dom";
import { render, screen, within, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { mockRouter } from "./test-utils/mockRouter";

enableFetchMocks();

// React Markdown Jest issue
jest.mock("../pages/Help", () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  };
});

beforeEach(async () => {
  await act(() => render(<RouterProvider router={mockRouter()} />));
})

test("Renders the navigation and actor list", async () => {
  const nav = screen.getByRole("navigation")
  within(nav).getByText("home");
  within(nav).getByText("help");

  const filters = await screen.findByTestId("filters");
  let actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(6);

  await userEvent.click(within(filters).getByText("space-trader"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(3);

  await userEvent.click(within(filters).getByText("space-shop"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(2);

  await userEvent.click(within(filters).getByText("home"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(1);

  await userEvent.click(within(filters).getByText("all"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(6);

});
