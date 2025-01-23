import { useState } from "react";

// css module
// import style from "./ProductsHeader.module.css";

export default function SectionHeader({ title, subtitle }) {
  return (
    <>
      <div>
        <div className="flex gap-x-[10px] mb-[30px] items-center">
          <div className="w-5 h-10 bg-secondary"></div>
          <h2 className="font-semibold text-secondary ">{title}</h2>
        </div>
        <h3 className="font-semibold text-2xl sm:text-4xl mb-[60px]">
          {subtitle}
        </h3>
      </div>
    </>
  );
}
