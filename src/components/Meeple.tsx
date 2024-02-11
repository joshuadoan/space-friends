import React, { useEffect } from "react";
import cx from "classnames";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { OutletContext } from "./Root";
import Avatar from "./Avatar";
import StyledLink from "./StyledLink";
import { Filter } from "../hooks/use-ux-state";

const MeepleDetail = () => {
  const [params] = useSearchParams();
  const filter = params.get("filter") as Filter;

  const { state } = useOutletContext() as OutletContext;

  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  const meeple = state.actors.find((a) => a.id === Number(meepleId));
  const journal = Object.entries(meeple?.getJournal() ?? []);

  useEffect(
    function handleSelected() {
      meeple?.zoomTo();
    },
    [meeple]
  );

  if (!meeple) {
    return null;
  }
  return (
    <section className="p-4">
      <p className="py-2">
        <StyledLink
          to={{
            pathname: "/meeples",
            search: `?filter=${filter}`,
          }}
        >
          {`<--`} back
        </StyledLink>
      </p>
      <div className="w-full text-left flex items-center gap-2 mb-4">
        <Avatar url={meeple.getAvatar()} />
        {meeple.name}{" "}
        <span className=" text-slate-400">{meeple.getState()}</span>
      </div>

      <dl
        className={cx("bg-purple-800 bg-opacity-50 p-2", {
          hidden: false,
        })}
      >
        <dt className="font-semibold">status</dt>
        {Object.entries(meeple.getStatus()).map(([key, value]) => {
          return (
            <dd key={key}>
              {key}: {value}
            </dd>
          );
        })}
      </dl>

      <dl
        className={cx("bg-purple-800 bg-opacity-50 p-2", {
          hidden: !journal.length,
        })}
      >
        <dt className="font-semibold">Journal</dt>
        {journal
          ?.slice(Math.max(journal.length - 5, 0))
          .map(([timestamp, entry], i) => {
            const spaceDate = new Date(Number(timestamp) * 1000);
            return (
              <dd key={i} className="flex gap-2 items-center">
                <span className=" opacity-60">
                  {spaceDate.toLocaleTimeString()}
                </span>
                <span className="flex-1">{entry}</span>
              </dd>
            );
          })}
      </dl>
    </section>
  );
};

export default MeepleDetail;
