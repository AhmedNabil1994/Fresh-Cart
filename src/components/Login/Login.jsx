import React from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import img from "../../assets/register-bg.JPG";

export default function Login() {
  return (
    <>
      <section className="login flex flex-wrap justify-between items-center gap-y-8 md:gap-y-0">
        <div className="w-full md:w-1/2 lg:w-2/3">
          <div className="md:pe-2 lg:pe-0">
            <img src={img} alt="register image" className="w-full lg:w-auto" />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <form className="md:ps-2 lg:ps-0">
            <h2 className="text-start text-2xl sm:text-4xl mb-3 font-medium">
              Log in to Fresh Cart
            </h2>
            <p className="text-start mb-6">Enter your details below</p>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <button
                type="submit"
                className="text-base text-white bg-secondary focus:outline-none font-medium rounded px-8 py-2.5 text-center"
              >
                Log in
              </button>
              <Link to="/forget" className="text-secondary">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
