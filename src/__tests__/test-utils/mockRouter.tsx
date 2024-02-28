import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../../pages/Root";
import ErrorPage from "../../pages/ErrorPage";
import mockRootLoader from "./mockRootLoader";
import List from "../../pages/Actors";
import Help from "../../pages/Help";
import MeepleDetail from "../../pages/[id]";

export function mockRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: mockRootLoader,
      shouldRevalidate: () => false,
      children: [
        {
          path: "/",
          element: <List />,
        },
        {
          path: "/:meepleId",
          element: <MeepleDetail />,
        },
        {
          path: "/help",
          element: <Help />,
        },
      ],
    },
  ]);
}
