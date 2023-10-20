import React from "react";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Game } from "../classes/game";
import Button from "./Button";
import NavLink from "./NavLink";

const Root = () => {
  const { game } = useLoaderData() as {
    game: Game;
  };

  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/meeples" />;
  }

  return (
    <div className="h-full flex flex-col w-80">
      <nav className="flex gap-2 bg-black bg-opacity-50 p-2">
        <NavLink to="/meeples">meeples</NavLink>
        <NavLink to="/help">help</NavLink>
        <Button onClick={() => game?.resetZoom()}>reset zoom</Button>
      </nav>
      <Outlet context={{ game }} />
    </div>
  );
};
export default Root;
