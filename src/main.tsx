import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Root from "./components/Root";
import Meeples from "./components/Meeples";
import Help from "./components/Help";
import { rootLoader } from "./components/Root";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
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
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("pepper") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
