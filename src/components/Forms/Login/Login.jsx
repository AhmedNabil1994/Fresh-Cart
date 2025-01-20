import React, { useContext, useState } from "react";
// import style from "./Login.module.css";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../FormWrapper/FormWrapper";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import Cookies from "js-cookie";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (formData) => {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formData)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          // using cookies to last for an hour only
          Cookies.set("token", res.data.token, { expires: 1/24 });
          setUserToken(res.data.token);
          setApiError("");
          navigate("/");
          console.log(res);
          console.log(formData);
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response.data.message);
      });
  };

  let validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Z](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{5,}$/,
        "Password must be at least 6 characters starting with a capital letter containing at least a number and a special character."
      )
      .required("Password is required")
      .min(6, "password min length is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <FormWrapper
        headerTitle="Log in to Fresh Cart"
        footerTitle="Don't have an account?"
        navigate="register"
        apiError={apiError}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.errors.email && formik.touched.email && (
              <div className="py-2 my-2 text-sm text-red-700" role="alert">
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.errors.password && formik.touched.password && (
              <div className="py-2 my-2 text-sm text-red-700" role="alert">
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-between items-center mb-8">
            <button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
              className={`text-base text-white ${
                !(formik.isValid && formik.dirty) || isLoading
                  ? "bg-secondary/50"
                  : "bg-secondary"
              } focus:outline-none font-medium rounded px-12 py-4 text-center`}
            >
              Log in
            </button>
            <Link to="/forget" className="text-secondary">
              Forget Password?
            </Link>
          </div>
        </form>
      </FormWrapper>
    </>
  );
}
