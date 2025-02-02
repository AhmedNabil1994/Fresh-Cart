import { all } from "axios";
import { useEffect, useState } from "react";

// css module
// import style from "./Search.module.css";

export default function Search({ search, setSearch }) {
  return (
    <>
      <section className="relative mb-10 md:w-2/3 mx-auto">
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-2 pe-10 text-sm text-gray-900 border border-[#F5F5F5] shadow-sm rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="What are you looking for ?"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </section>
    </>
  );
}
