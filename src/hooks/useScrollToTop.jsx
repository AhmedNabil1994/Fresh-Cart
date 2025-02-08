import React, { useEffect, useRef } from "react";

export default function useScrollToTop() {
  const topRef = useRef();

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "auto" });
  }, []);
  return topRef;
}
