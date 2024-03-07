import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { enableFetchMocks } from "jest-fetch-mock";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { render, screen, within, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { routes } from "../routes";
import mockRootLoader from "./test-utils/mockRootLoader";

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

const mockRoutes = [...routes]
const [root] = mockRoutes
root.loader = mockRootLoader

const router = createBrowserRouter([root]);

beforeEach(async () => {
  await act(() => render(<RouterProvider router={router} />));
})

test("Renders the navigation and actor list", async () => {
  const nav = screen.getByRole("navigation")
  within(nav).getByText("home");
  within(nav).getByText("help");

  await userEvent.click(within(nav).getByText("home"));

  let actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(6);

  const filters = await screen.findByTestId("filters");

  await userEvent.click(within(filters).getByTitle("filter by space-trader"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(3);

  await userEvent.click(within(filters).getByTitle("filter by space-shop"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(2);

  await userEvent.click(within(filters).getByTitle("filter by home"));
  actors = await screen.findAllByTestId("actor");
  expect(actors.length).toBe(1);

});
