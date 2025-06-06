import { useEffect } from "react";

export default function useScrollToTop(id) {
  useEffect(() => {
    scrollTo({ top: 0 });
  }, [id && id]);
}
