import React from "react";
import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Root from "../components/Root";

enableFetchMocks();

test("Renders the application", async () => {
  render(
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "*",
          element: <Root />,
          loader: () => {
            return new Promise((resolve) => {
              resolve({
                game: {
                  currentScene: {
                    actors: [],
                  },
                },
              });
            });
          },
        },
      ])}
    />
  );

  await screen.findByText("meeples");
  await screen.findByText("help");
  await screen.findByText("reset zoom");
});
