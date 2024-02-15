import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { OutletContext } from "../types";
import StyledLink from "./StyledLink";
import { Meeple } from "./Meeple";
import Journal from "./Journal";
import useFilters from "../hooks/useFilters";

const MeepleDetail = () => {
  const { filter } = useFilters();
  const { state } = useOutletContext() as OutletContext;

  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  const meeple = state.actors.find((a) => a.id === Number(meepleId));

  useEffect(
    function handleSelected() {
      meeple?.zoomTo();
    },
    [meeple]
  );

  if (!meeple) {
    return null;
  }

  const { journal } = meeple?.status;

  return (
    <section className="px-4">
      <p className="py-4">
        <StyledLink
          to={{
            pathname: "/meeples",
            search: `?filter=${filter}`,
          }}
        >
          {`<--`} back
        </StyledLink>
      </p>
      <Meeple meeple={meeple} />
      <Journal journal={journal} />
    </section>
  );
};

export default MeepleDetail;
