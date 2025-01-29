import React from "react";
// import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="px-4 pt-32 my-3">
        <div className="container">
          <Outlet />
        </div>
      </section>
      <Footer />
      <section>
        <a
          href="#"
          className="bg-[#f5f5f5] fixed start-2 z-30 bottom-2 w-12 h-12 rounded-full flex justify-center items-center "
        >
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </section>
    </>
  );
}
