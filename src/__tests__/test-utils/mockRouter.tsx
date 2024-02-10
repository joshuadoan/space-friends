import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../../components/Root";
import ErrorPage from "../../components/ErrorPage";
import mockRootLoader from "./mockRootLoader";
import Meeples from "../../components/Meeples";
import Help from "../../components/Help";
import MeepleDetail from "../../components/Meeple";

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
          path: "/meeples",
          element: <Meeples />,
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
