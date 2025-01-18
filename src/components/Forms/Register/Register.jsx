import React from "react";
// import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../../assets/forms/Icon-Google.png";
import FormWrapper from "../FormWrapper/FormWrapper";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      formData
    );
    console.log(data);
    if (data.message === "success") { 
      // login page
      navigate("/login");
    } else {
      //show error
    }
  };

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min length is 3")
      .max(10, "Max length is 10")
      .required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^[A-Z](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{5,}$/,
        "Password must be at least 6 characters starting with a capital letter containing at least a number and a special character."
      )
      .required("Password is required")
      .min(6, "password min length is 6"),
    rePassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password not match"),
    phone: yup
      .string()
      .matches(/^01[1025][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    /* 
     using yup
     validationSchema: validationSchema ===> validationSchema only
     if key and values are the same
    */
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <FormWrapper
        headerTitle="Create an account"
        footerTitle="Already have account?"
        navigate="login"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-3 group">
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="name"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {formik.errors.name && formik.touched.name && (
              <div className="py-2 my-2 text-sm text-red-700" role="alert">
                <span className="font-medium">{formik.errors.name}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-3 group">
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
              <div className="py-2 my-2 text-sm text-red-700">
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <div className="py-2 my-2 text-sm text-red-700">
                <span className="font-medium">{formik.errors.phone}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-3 group">
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
              <div className="py-2 my-2 text-sm text-red-700">
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="py-2 my-2 text-sm text-red-700">
                <span className="font-medium">{formik.errors.rePassword}</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="text-base text-white bg-secondary focus:outline-none font-medium rounded w-full  px-5 py-2.5 text-center mb-4"
          >
            Create Account
          </button>
          <button
            className="text-base capitalize text-black border-2 border-[#00000040] focus:outline-none font-medium rounded w-full px-5 py-2.5 text-center mb-8
              flex justify-center gap-x-4"
          >
            <img src={googleIcon} alt="google icon" />
            sign up with google
          </button>
        </form>
      </FormWrapper>
    </>
  );
}
