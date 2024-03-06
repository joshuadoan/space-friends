import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../../pages/Root";
import ErrorPage from "../../pages/ErrorPage";
import mockRootLoader from "./mockRootLoader";
import List from "../../pages/actors/Actors";
import Help from "../../pages/Help";
import MeepleDetail from "../../pages/actors/[id]";

export function mockRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: mockRootLoader,
      errorElement: <ErrorPage />,
      shouldRevalidate: () => false,
      children: [
        {
          path: "/actors",
          element: <List />,
          children: [
            {
              path: "/actors/:actorId",
              element: <MeepleDetail />,
            },
          ]
        },

        {
          path: "/help",
          element: <Help />,
        },
      ],
    },
  ]);
}
