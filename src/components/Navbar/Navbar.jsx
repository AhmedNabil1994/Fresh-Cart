import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { FiUser } from "react-icons/fi";
import { Dropdown } from "flowbite-react";
import { TbLogout2 } from "react-icons/tb";
import orderIcon from "../../assets/navbar/icon-mallbag.png";
import { useQueryClient } from "@tanstack/react-query";
import { DarkThemeToggle } from "flowbite-react";

export default function NavbarComp() {
  const navigate = useNavigate();
  const { userToken, setUserToken, setUserData, setUserId } =
    useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("username-email");
    setUserToken(null);
    setUserData(null);
    setUserId(null);
    queryClient.removeQueries(["orders"]);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-50 dark:bg-gray-800">
        <div className="gap-y-4 max-w-screen-xl flex flex-col sm:flex-row flex-wrap items-center sm:justify-between md:justify-evenly lg:justify-around mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-cart-shopping text-secondary text-3xl"></i>
            <span className="capitalize self-center text-2xl font-inter font-bold whitespace-nowrap dark:text-white">
              fresh cart
            </span>
          </Link>
          <div className="flex md:order-2 items-center">
            <div className="flex items-center gap-2 justify-between">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar-1"
                  className="block w-full md:w-[250px]  p-2 pe-10 text-sm text-gray-900 border border-[#F5F5F5] shadow-sm rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What are you looking for?"
                />
              </div>
              {userToken && (
                <>
                  <NavLink
                    to="wishlist"
                    className={({ isActive }) =>
                      `relative inline-flex items-center p-3 text-sm ${
                        isActive ? 'text-secondary dark:text-emerald-400' : 'text-gray-700 dark:text-white'
                      }`
                    }
                  >
                    <i className="fa fa-regular fa-heart text-2xl cursor-pointer"></i>
                    {wishlist?.data?.length > 0 && (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-secondary rounded-full top-1 end-0">
                        {wishlist.data?.length}
                      </div>
                    )}
                  </NavLink>
                  <NavLink
                    to="cart"
                    className={({ isActive }) =>
                      `relative inline-flex items-center p-3 text-sm ${
                        isActive ? 'text-secondary dark:text-emerald-400' : 'text-gray-700 dark:text-white'
                      }`
                    }
                  >
                    <IoCartOutline
                      size={30}
                      className="cursor-pointer"
                    />
                    <span className="sr-only">Notifications</span>
                    {cart?.numOfCartItems > 0 && (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-secondary rounded-full top-1 end-0">
                        {cart.numOfCartItems}
                      </div>
                    )}
                  </NavLink>
                  <Dropdown
                    label={
                      <div
                        className={`p-2 rounded-full transition -mt-1 bg-red-500 text-white`}
                      >
                        <FiUser className="text-xl lg:text-2xl" />
                      </div>
                    }
                    className="bg-[#a19da2]  rounded-lg shadow-sm "
                    arrowIcon={false}
                    inline
                  >
                    <Link to={"/my-account"}>
                      <Dropdown.Item
                        icon={FiUser}
                        className="text-white hover:bg-transparent focus:bg-transparent"
                      >
                        Manage My Account
                      </Dropdown.Item>
                    </Link>
                    <Link to={"/allorders"}>
                      <Dropdown.Item className="text-white hover:bg-transparent focus:bg-transparent">
                        <img
                          src={orderIcon}
                          alt="order icon"
                          className="w-4 me-2"
                        />
                        My Orders
                      </Dropdown.Item>
                    </Link>
                    <Dropdown.Item
                      onClick={handleLogout}
                      icon={TbLogout2}
                      className="text-white hover:bg-transparent focus:bg-transparent"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </>
              )}
              <DarkThemeToggle className="focus:outline-none focus:ring-0 hover:bg-transparent dark:hover:bg-transparent" />
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-0 "
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                type="text"
                id="search-navbar-2"
                className="block w-full p-2  text-sm text-gray-900 border border-[#F5F5F5] shadow-sm rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="What are you looking for?"
              />
            </div>
            <ul className="text-center flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent max-h-[50vh] overflow-auto dark:text-black md:dark:text-white">
              {userToken && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="hover:text-secondary transition-colors duration-300 font-normal  inline-block py-2 px-3 md:p-0"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="hover:text-secondary transition-colors duration-300 font-normal  inline-block py-2 px-3 md:p-0"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="hover:text-secondary transition-colors duration-300 font-normal  inline-block py-2 px-3 md:p-0"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className="hover:text-secondary transition-colors duration-300 font-normal  inline-block py-2 px-3 md:p-0"
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              )}
              {!userToken && (
                <>
                  <li>
                    <NavLink
                      to="register"
                      className="font-normal  inline-block py-2 px-3 md:p-0"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="login"
                      className="font-normal  inline-block py-2 px-3 md:p-0"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
