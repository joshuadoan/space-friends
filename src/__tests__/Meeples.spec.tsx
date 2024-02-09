import React from "react";
import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Root from "../components/Root";
import { Ship } from "../classes/ship";
import { Destination } from "../classes/destination";
import ErrorPage from "../components/ErrorPage";
import Meeples from "../components/Meeples";
import Help from "../components/Help";

enableFetchMocks();

test("Renders the application", async () => {
  render(
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          errorElement: <ErrorPage />,
          loader: () => {
            return new Promise((resolve) => {
              resolve({
                game: {
                  currentScene: {
                    actors: [
                      new Ship({
                        name: "Meeple 1",
                      }),
                      new Ship({
                        name: "Meeple 2",
                      }),
                      new Ship({
                        name: "Meeple 3",
                      }),
                      new Destination({
                        name: "Destination 1",
                      }),
                      new Destination({
                        name: "Destination 2",
                      }),
                    ],
                  },
                },
              });
            });
          },
          shouldRevalidate: () => false,
          children: [
            {
              path: "/meeples",
              element: <Meeples />,
              children: [
                {
                  path: "/meeples/:meepleId",
                  element: <Meeples />,
                },
              ],
            },
            {
              path: "/help",
              element: <Help />,
            },
          ],
        },
      ])}
    />
  );

  await screen.findByText("meeples");
  await screen.findByText("help");
  await screen.findByText("reset zoom");

  await screen.findByText("Meeple 1");
  await screen.findByText("Meeple 2");
  await screen.findByText("Meeple 3");

  let actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(3);

  await userEvent.click(await screen.findByText("all"));
  actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(5);

  await userEvent.click(await screen.findByText("destinations"));
  actors = await screen.findAllByTestId("meeple");
  expect(actors.length).toBe(2);
});
