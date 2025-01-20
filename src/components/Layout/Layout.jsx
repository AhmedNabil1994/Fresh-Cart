import React from "react";
// import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="px-4 py-32 my-3">
        <div className="container">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
