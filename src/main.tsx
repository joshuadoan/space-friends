import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root";
import List from "./pages/Actors";
import Help from "./components/Help";
import { rootLoader } from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import MeepleDetail from "./components/Details";

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
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("pepper") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
