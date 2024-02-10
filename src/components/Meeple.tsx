import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Blockies from "react-blockies";
import { OutletContext } from "./Root";

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
        <Blockies
          seed={meeple.name}
          size={8}
          scale={3}
          color={meeple.color.toHex()}
          bgColor="#000"
        />
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
