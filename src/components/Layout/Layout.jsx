import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
