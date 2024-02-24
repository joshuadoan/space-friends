import React, { useEffect } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { OutletContext } from "../types";
import StyledLink from "./StyledLink";
import { Badge } from "./Badge";
import Journal from "./Journal";

const MeepleDetail = () => {
  const { state } = useOutletContext() as OutletContext;
  const [searchParams] = useSearchParams();

  const { meepleId } = useParams<{
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
            pathname: "/",
            search: `?${searchParams.toString()}`,
          }}
        >
          {`<--`} back
        </StyledLink>
      </p>
      <Badge meeple={meeple} />
      <Journal journal={journal} />
    </section>
  );
};

export default MeepleDetail;
