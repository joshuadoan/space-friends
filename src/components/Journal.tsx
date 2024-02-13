import React from "react";
import { Journal } from "../types";

const Journal = (props: { journal: Journal }) => {
  const journal = Object.entries(props.journal);

  return (
    <dl className={"p-2"}>
      <dt className="font-semibold">Journal</dt>
      {journal?.length ? (
        journal
          ?.slice(Math.max(journal.length - 7, 0))
          .map(([timestamp, entry], i) => {
            const spaceDate = new Date(Number(timestamp) * 1000);
            return (
              <dd key={i} className="flex gap-2 items-center">
                <label className="opacity-70">
                  {spaceDate.toLocaleTimeString()}
                </label>
                <span className="flex-1">{entry}</span>
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
