import { useState } from "react";

// css module
// import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
     <section className="text-center">
      <h2 className="mb-10 font-medium text-4xl sm:text-6xl md:text-8xl lg:text-[110px]">404 Not Found</h2>
      <p>Your visited page not found.</p>
     </section>
    </>
  );
}
