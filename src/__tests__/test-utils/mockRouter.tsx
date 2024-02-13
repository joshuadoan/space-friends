import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../../components/Root";
import ErrorPage from "../../components/ErrorPage";
import mockRootLoader from "./mockRootLoader";
import List from "../../components/List";
import Help from "../../components/Help";
import MeepleDetail from "../../components/Details";

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
          path: "/meeples",
          element: <List />,
        },
        {
          path: "/meeples/:meepleId",
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
