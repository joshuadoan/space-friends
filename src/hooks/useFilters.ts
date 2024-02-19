import { useSearchParams } from "react-router-dom";
import { ActorKind } from "../classes/ActorKind";

export default function useFilters() {
  const [params] = useSearchParams();
  return {
    filter: params.get("filter") as ActorKind,
  };
}
