import { useSearchParams } from "react-router-dom";
import { Filter } from "./use-ux-state";

export default function useFilters() {
  const [params] = useSearchParams();
  return {
    filter: params.get("filter") as Filter,
  };
}
