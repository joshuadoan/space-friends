import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { enableFetchMocks } from "jest-fetch-mock";
import { RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { mockRouter } from "./test-utils/mockRouter";

enableFetchMocks();

test("Renders the ships and can filter", async () => {
  render(<RouterProvider router={mockRouter()} />);

  await screen.findByText("meeples");
  await screen.findByText("help");

  await screen.findByText("Meeple 1");
  await screen.findByText("Meeple 2");
  await screen.findByText("Meeple 3");

  let actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(5);

  await userEvent.click(await screen.findByText("destinations"));
  actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(2);

  await userEvent.click(await screen.findByText("ships"));
  actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(3);

  await userEvent.click(await screen.findByText("all"));
  actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(5);
});
