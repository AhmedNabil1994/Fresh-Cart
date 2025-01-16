import { useState } from "react";

// css module
import style from "./FormWrapper.module.css";
import img from "../../../assets/forms/bg.png";
import { Link } from "react-router-dom";

export default function FormWrapper({
  children,
  headerTitle,
  footerTitle,
  navigate,
}) {
  return (
    <>
      <section className="form-wrapper flex flex-wrap justify-around items-center gap-y-8 md:gap-y-0">
        <div className="w-full md:w-1/2">
          <div className="md:pe-3 lg:pe-0">
            <img src={img} alt="register image" className="w-full" />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="md:ps-3 lg:ps-0">
            <h2 className="text-2xl sm:text-4xl mb-3 font-medium">
              {headerTitle}
            </h2>
            <p className="mb-6">Enter your details below</p>
            {children}
          </div>
          <p className="text-center">
            {footerTitle}
            <Link
              className="capitalize font-medium underline ms-4 underline-offset-[6px]"
              to={`/${navigate}`}
            >
              {navigate}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
