import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-white z-40">
      <div className={`${style.loader}`}></div>
    </div>
  );
}
