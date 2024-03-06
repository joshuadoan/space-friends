import React from "react";
import { useOutletContext, Outlet, useSearchParams } from "react-router-dom";
import { UxAction, UxState } from "../types";
import { ActorDetails } from "../components/ActorDetails";
import useFilters from "../hooks/useFilters";
import StyledLink from "../components/StyledLink";
import Avatar from "../components/Avatar";
import { Filters } from "../components/Filters";

const List = () => {
  const [searchParams] = useSearchParams();
  const { actorKind: actor } = useFilters();
  const { state } = useOutletContext() as {
    state: UxState;
    dispatch: React.Dispatch<UxAction>;
  };


  return (
    <>
      <Filters />
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
        data-test-id="menu"
      >
        {state.actors
          .filter((a) => (!!actor ? a.kind === actor : true))
          .map((actor) => (
            <li key={actor.id} data-testid="actor" className="mb-4">
              <div className={"flex items-center gap-2"}>
                <StyledLink
                  to={`/${actor.id}?${searchParams?.toString()}`}
                  title="Click to zoom and follow"
                >
                  <div className="w-full text-left flex items-center gap-2">
                    <Avatar url={actor.status.imgUrl} />
                    <div className="flex flex-col">
                      {actor.name}
                      <span className="opacity-70 flex items-center gap-2">
                        {actor.kind}
                        <div
                          className="w-2 h-2 rounded-md"
                          style={{
                            backgroundColor: actor.color.toString(),
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </StyledLink>
              </div>
              <ActorDetails meeple={actor} />
            </li>
          ))}
      </menu>
      <Outlet />
    </>
  );
};

export default List;
