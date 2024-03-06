import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { OutletContext } from "../../types";
import { ActorDetails } from "../../components/ActorDetails";
import Journal from "../../components/Journal";

const MeepleDetail = () => {
  const { state } = useOutletContext() as OutletContext;

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
    <section className="h-full flex flex-col gap-2">
      <ActorDetails meeple={meeple} />
      <Journal journal={journal} />
    </section>
  );
};

export default MeepleDetail;
