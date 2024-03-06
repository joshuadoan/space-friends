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
      {
        !actorId && (
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
            </ul><menu
              className="flex flex-col justify-start overflow-auto p-4 gap-2"
              role="menu"
              data-test-id="menu"
            >
              {state.actors
                .filter((actor) => actorKind ? actor.kind === actorKind : true)
                .map((actor) => (
                  <li key={actor.id} data-testid="actor" >
                    <StyledLink
                      to={{
                        pathname: `/actors/${actor.id}`,
                        search: `?${FilterKinds.Actor}=${actor.kind}`,
                      }}
                      className="flex gap-2 items-start"
                      title="Click to zoom and follow"
                    >
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
                        <span className="flex gap-2 items-center">
                          <span>x: {Math.round(actor.pos.x)}</span>
                          <span>y:{Math.round(actor.pos.y)}</span>
                        </span>
                      </div>
                    </StyledLink>
                  </li>
                ))}
            </menu>
          </>)
      }
      <Outlet context={{
        state
      }} />
    </>
  );
};

export default List;
