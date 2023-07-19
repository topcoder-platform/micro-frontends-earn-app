import { useLocation } from "@reach/router";
import { useEffect, useRef } from "react";

export const usePreviousLocation = () => {
  const location = useLocation();
  const ref = useRef(location);

  useEffect(() => {
    ref.current = location;
  }, [location]);

  return ref.current;
};
