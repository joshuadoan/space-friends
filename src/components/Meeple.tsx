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
      <p>
        <StyledLink
          to={{
            pathname: "/meeples",
            search: `?filter=${filter}`,
          }}
        >
          {`<--`}back
        </StyledLink>
      </p>
      <div className="w-full text-left flex items-center gap-2 mb-4">
        <Avatar url={meeple.getAvatar()} />
        {meeple.name}
      </div>

      <dl
        className={cx("bg-purple-800 bg-opacity-50 p-2", {
          hidden: !journal.length,
        })}
      >
        <dt>journal:</dt>
        {journal
          ?.slice(Math.max(journal.length - 5, 0))
          .map(([timestamp, entry], i) => {
            const spaceDate = new Date(Number(timestamp) * 1000);
            return (
              <dd key={i} className="flex gap-2 items-center">
                <span className="flex gap-0.5">
                  <span className="bg-black p-1"> {spaceDate.getHours()}</span>
                  <span className="bg-black p-1">{spaceDate.getMinutes()}</span>
                  <span className="bg-black p-1">{spaceDate.getSeconds()}</span>
                </span>
                {entry}
              </dd>
            );
          })}
      </dl>
    </section>
  );
};

export default MeepleDetail;
