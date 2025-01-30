import { useState } from "react";

// css module
// import style from "./ProductsHeader.module.css";

export default function SectionHeader({
  title,
  subtitle,
  hasArrow,
  handlePrev,
  handleNext,
  lastPage,
  currentPage,
}) {
  return (
    <>
      <section>
        <div className="flex gap-x-[10px] mb-[30px] items-center">
          <div className="w-5 h-10 bg-secondary"></div>
          <h2 className="font-semibold text-secondary ">{title}</h2>
        </div>
        <div className="flex  justify-between items-center mb-[60px]">
          <h3 className="font-semibold text-lg sm:text-4xl">{subtitle}</h3>
          {hasArrow && (
            <div className="flex">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                // className="disabled:bg-opacity-75 disabled:hover:bg-opacity-75"
              >
                <i className="bg-[#f5f5f5] fa-solid fa-arrow-left me-2 p-2 sm:p-4 rounded-full hover:bg-secondary hover:text-white transition duration-500"></i>
              </button>
              <button
                onClick={()=>handleNext()}
                disabled={currentPage === lastPage ? true : false}
              >
                <i className="bg-[#f5f5f5] fa-solid fa-arrow-right p-2 sm:p-4 rounded-full hover:bg-secondary hover:text-white transition duration-500"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
