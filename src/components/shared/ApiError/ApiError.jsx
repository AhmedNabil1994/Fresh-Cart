import { useState } from "react";

// css module
// import style from "./ApiError.module.css";

export default function ApiError({error}) {
  return (
    <>
      <div className="alert-error">{error}</div>
    </>
  );
}
