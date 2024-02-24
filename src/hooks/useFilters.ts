import { useSearchParams } from "react-router-dom";
import { ActorKind } from "../classes/ActorKind";

export enum FilterKinds {
  Actor = "actors"
}

export default function useFilters() {
  const [params] = useSearchParams();
  return {
    actorKind: params.get(FilterKinds.Actor) as ActorKind,
  };
}
