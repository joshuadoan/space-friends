import React from "react";
import cx from "classnames"
import { useOutletContext, Outlet, useSearchParams, useParams } from "react-router-dom";
import { FilterKinds, UxAction, UxState } from "../../types";
import StyledLink from "../../components/StyledLink";
import Avatar from "../../components/Avatar";
import StyledNavLink from "../../components/StyledNavLink";
import { ActorKind } from "../../classes/ActorKind";
import { MEEPLE_COLOR } from "../../classes/Base";

const List = () => {
  const [params] = useSearchParams();
  const actorKind = params.get(FilterKinds.Actor);

  const { actorId } = useParams<{
    actorId: string;
  }>();

  const { state } = useOutletContext() as {
    state: UxState;
    dispatch: React.Dispatch<UxAction>;
  };

  return (
    <>
      <ul className="flex items-center gap-2 px-4" data-testid="filters">
        {(Object.values(ActorKind) as Array<ActorKind>).map((key) => (
          <li key={key} className="rounded-md flex items-center gap-2">
            <StyledNavLink
              to={{
                pathname: `/actors`,
                search: `?${FilterKinds.Actor}=${key}`,
              }}
              className={cx("hover:underline p-2 flex items-center gap-2", {
                "bg-purple-800 ": actorKind === key,
              })}
              title={`filter by ${key}`}
            >
              <div
                className="w-4 h-4"
                style={{
                  backgroundColor: MEEPLE_COLOR[key].toString(),
                }}
              />
              <span>
                {state.actors.reduce((acc, meeple) => {
                  if (meeple.kind === key) {
                    return acc + 1;
                  }
                  return acc;
                }, 0)}
              </span>
            </StyledNavLink>
          </li>
        ))}
      </ul>
      {
        !!actorId && <p className="pt-2 px-4">
          <StyledLink
            to={{
              pathname: "/actors",
              search: `?${params.toString()}`,
            }}
          >
            {`<--`} back
          </StyledLink>
        </p>
      }
      <menu
        className="flex flex-col justify-start overflow-auto px-4 py-2 gap-2"
        role="menu"
        data-test-id="menu"
      >
        {state.actors
          .filter((actor) => actorKind ? actor.kind === actorKind : true)
          .map((actor) => (
            <li key={actor.id} data-testid="actor" className={cx({
              "hidden": actorId && actor.id !== Number(actorId),
            })}>
              <div

                className="flex gap-2 items-start"
                title="Click to zoom and follow"
              >
                <Avatar url={actor.status?.imgUrl} />
                <div className="flex flex-col">
                  <StyledLink
                    to={{
                      pathname: `/actors/${actor.id}`,
                      search: `?${FilterKinds.Actor}=${actor.kind}`,
                    }}
                    className="flex gap-2 items-start underline"
                    title="Click to zoom and follow"
                  >
                    {actor.name}
                  </StyledLink>
                  <span className="opacity-70 flex items-center gap-2">
                    {actor.kind}
                    <div
                      className="w-2 h-2 rounded-md"
                      style={{
                        backgroundColor: actor.color.toString(),
                      }}
                    />
                    {actor.status?.journal.length && actor.status.journal[actor.status.journal.length - 1].state}
                  </span>
                  <span className="flex gap-2 items-center">
                    <span>x: {Math.round(actor.pos.x)}</span>
                    <span>y:{Math.round(actor.pos.y)}</span>
                  </span>
                  <Outlet context={{
                    state
                  }} />
                </div>
              </div>
            </li>
          ))}
      </menu>
    </>
  );
};

export default List;
