import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import qr from "../../assets/footer/qr_code.png";
import appStore from "../../assets/footer/app_store.png";
import googlePlay from "../../assets/footer/google_play.png";
import submitIcon from "../../assets/footer/Vector.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-[#FAFAFA] p-14">
        <div className="row justify-between gap-y-3">
          <div className="w-full text-center sm:text-start sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div>
              <h2 className="text-2xl font-bold mb-4 font-inter">Fresh Cart</h2>
              <p className="mb-2 text-xl font-medium">Subscribe</p>
              <p className="mb-2">Get 10% off your first order</p>
              <form className="relative ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mb-2 bg-transparent border-white rounded"
                />
                <img
                  src={submitIcon}
                  alt="Submit"
                  className="text-2xl absolute right-0 top-[20%]"
                />
              </form>
            </div>
          </div>
          <div className="w-full text-center sm:text-start sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div className="sm:ps-5 md:ps-10 lg:ps-20">
              <h2 className="text-xl font-medium mb-4">Support</h2>
              <ul>
                <li className="mb-2">
                  111 Arab Academy st, Alexandria, Egypt.
                </li>
                <li className="mb-2">
                  <a href="mailto:freshcart@gmail.com">freshcart@gmail.com</a>
                </li>
                <li className="mb-2">
                  <a href="tel:+88015-88888-9999">+88015-88888-9999</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full text-center sm:text-start sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div className="ps-0 md:ps-10 lg:ps-20">
              <h2 className="text-xl font-medium mb-4">Account</h2>
              <ul>
                <li className="mb-3">
                  <Link to="/myAccount">My Account</Link>
                </li>
                <li className="mb-3">
                  <Link to="/login">Login</Link>
                  <Link to="/register">/ Register</Link>
                </li>
                <li className="mb-3">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="mb-3">
                  <Link to="/wishlist">Wishlist</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full text-center sm:text-start sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div className="sm:ps-5 md:ps-10 lg:ps-20">
              <h2 className="text-xl font-medium mb-4">Quick Link</h2>
              <ul>
                <li className="mb-3">
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li className="mb-3">
                  <Link to="/terms">Terms Of Use</Link>
                </li>
                <li className="mb-3">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="mb-3">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:mx-auto md:m-0 w-full text-center sm:text-start sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div className="flex flex-col items-center md:block">
              <h2 className="text-xl font-medium mb-4">Download App</h2>
              <div className="flex items-center gap-2.5">
                <picture>
                  <img
                    src={qr}
                    alt="QR Code Image"
                    className=" border border-white rounded-md"
                  />
                </picture>
                <picture>
                  <img
                    src={googlePlay}
                    alt="Google Play Image"
                    className="border border-white rounded-md mb-1"
                  />
                  <img
                    src={appStore}
                    alt="App Store Image"
                    className="border border-white rounded-md"
                  />
                </picture>
              </div>
              <ul className="flex gap-x-6 mt-4">
                <li>
                  <Link to="">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-tiktok"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
