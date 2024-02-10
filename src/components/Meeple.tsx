import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { OutletContext } from "./Root";
import Avatar from "./Avatar";

const MeepleDetail = () => {
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
      <div className="w-full text-left flex items-center gap-2 mb-4">
        <Avatar url={meeple.getAvatar()} />

        {meeple.name}
      </div>

      <dl className="bg-purple-800 bg-opacity-50 p-2">
        <dt>journal:</dt>
        {journal
          ?.slice(Math.max(journal.length - 5, 0))
          .map(([timestamp, entry], i) => {
            const spaceDate = new Date(Number(timestamp) * 1000);
            return (
              <dd key={i}>
                <span className="bg-black p-2 rounded-md">
                  {spaceDate.getHours()}
                  {spaceDate.getMinutes()}
                  {spaceDate.getSeconds()}
                  {spaceDate.getMilliseconds()}
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
