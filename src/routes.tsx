
import Root from "./pages/Root";
import List from "./pages/actors/Actors";
import Help from "./pages/Help";
import { rootLoader } from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import MeepleDetail from "./pages/actors/[id]"; import React from "react";
;
export const routes = [
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]