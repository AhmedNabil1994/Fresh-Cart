import { useState } from "react";

// css module
// import style from "./ApiError.module.css";

export default function ApiError({ error }) {
  return (
    <>
      <div className="flex justify-center items-center h-[30vh]">
        <div className="alert-error w-full">
          <p className="line-clamp-2">{error}</p>
        </div>
      </div>
    </>
  );
}
