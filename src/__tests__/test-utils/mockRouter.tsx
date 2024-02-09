import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../../components/Root";
import ErrorPage from "../../components/ErrorPage";
import mockRootLoader from "./mockRootLoader";
import Meeples from "../../components/Meeples";
import Help from "../../components/Help";

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
  ]);
}
