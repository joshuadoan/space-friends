import React from "react";
import { Journal } from "../classes/Journal";

const Journal = ({ journal }: { journal: Journal }) => {
  return (
    <dl>
      <dt className="font-semibold">Journal</dt>
      {journal?.length ? (
        journal
          ?.slice(Math.max(journal.length - 10, 0))
          .map(({ timestamp, action }, i) => {
            const spaceDate = new Date(Number(timestamp) * 1000);
            return (
              <dd key={i} className="flex gap-2 items-center">
                <label className="opacity-70">
                  {spaceDate.toLocaleTimeString()}
                </label>
                <span className="flex-1">{action}</span>
              </dd>
            );
          })
      ) : (
        <dd>No entries yet.</dd>
      )}
    </dl>
  );
};

export default Journal;
