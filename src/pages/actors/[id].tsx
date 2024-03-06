import React, { useEffect } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { OutletContext } from "../../types";
import StyledLink from "../../components/StyledLink";
import { ActorDetails } from "../../components/ActorDetails";
import Journal from "../../components/Journal";
import Avatar from "../../components/Avatar";

const MeepleDetail = () => {
  const { state } = useOutletContext() as OutletContext;
  const [searchParams] = useSearchParams();

  const { actorId } = useParams<{
    actorId: string;
  }>();

  const meeple = state.actors.find((a) => a.id === Number(actorId));



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
    <section className="h-full px-4 flex flex-col gap-2">
      <p className="py-4">
        <StyledLink
          to={{
            pathname: "/actors",
            search: `?${searchParams.toString()}`,
          }}
        >
          {`<--`} back
        </StyledLink>
      </p>
      <div className="w-full text-left flex items-center gap-2">
        <Avatar url={meeple.status.imgUrl} />
        <div className="flex flex-col">
          {meeple.name}
          <span className="opacity-70 flex items-center gap-2">
            {meeple.kind}
            <div
              className="w-2 h-2 rounded-md"
              style={{
                backgroundColor: meeple.color.toString(),
              }}
            />
          </span>
        </div>
      </div>
      <ActorDetails meeple={meeple} />
      <Journal journal={journal} />
    </section>
  );
};

export default MeepleDetail;
