import React, { useEffect } from "react";
// import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

export default function Layout() {
  const section = useRef();
  const handleClick = () => {
    section.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <section>

      <Navbar />
      <section className="px-4 pt-32 my-3" ref={section}>
        <div className="container">
          <div className="lg:mx-16">
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
      <section>
        <a
          onClick={handleClick}
          className="bg-[#f5f5f5] fixed end-2 z-30 bottom-2 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </section>
    </section>
    </>
  );
}
