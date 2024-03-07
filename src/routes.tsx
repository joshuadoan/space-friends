
import React from "react";
import Root from "./pages/Root";
import List from "./pages/actors/Actors";
import Help from "./pages/Help";
import { rootLoader } from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import MeepleDetail from "./pages/actors/[id]";
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
        path: "/",
        element: <List />,
        children: [
          {
            path: "/actors/:actorId",
            element: <MeepleDetail />,
          },
        ]
      },
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