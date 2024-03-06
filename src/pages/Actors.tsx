import React from "react";
import cx from "classnames"
import { useOutletContext, Outlet, useSearchParams, useParams } from "react-router-dom";
import { UxAction, UxState } from "../types";
import { ActorDetails } from "../components/ActorDetails";
import useFilters, { FilterKinds } from "../hooks/useFilters";
import StyledLink from "../components/StyledLink";
import Avatar from "../components/Avatar";
import StyledNavLink from "../components/StyledNavLink";
import { ActorKind } from "../classes/ActorKind";
// import { Filters } from "../components/Filters";

const List = () => {
  const [searchParams] = useSearchParams();
  const { actorKind } = useFilters();
  let { meepleId } = useParams<{
    meepleId: string;
  }>();
  const { state } = useOutletContext() as {
    state: UxState;
    dispatch: React.Dispatch<UxAction>;
  };


  return (
    <>
      <div
        className={cx("flex items-center gap-2 bg-black bg-opacity-50 px-4", {
          // hidden: !!meepleId,
        })}
        data-testid="filters"
      >
        <StyledNavLink
          to="/"

          className={cx("hover:underline p-2", {
            "bg-purple-800 ": !actorKind,
            "opacity-50": !!meepleId,
          })}
        >
          all
        </StyledNavLink>
        {
          (Object.values(ActorKind) as Array<ActorKind>).filter(f => {
            return f !== ActorKind.Star;
          }).map((key, i) => {
            return <StyledNavLink
              key={i}
              to={`?${FilterKinds.Actor}=${key}`}
              className={cx("hover:underline p-2", {
                "bg-purple-800 ": actorKind === key,
              })}
            >
              {key}
            </StyledNavLink>
          })
        }
      </div>
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
        data-test-id="menu"
      >
        {state.actors
          .filter((a) => (!!actorKind ? a.kind === actorKind : true))
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
