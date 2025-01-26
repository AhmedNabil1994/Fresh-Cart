import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <div className={`${style.loader}`}></div>
    </div>
  );
}
