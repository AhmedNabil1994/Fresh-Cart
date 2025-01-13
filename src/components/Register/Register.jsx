import React from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    // formdata carries the object with new values
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      formData
    );
    console.log(data);
    if (data.message === "success") {
      // home page
      navigate("/");
    } else {
      //show error
    }
  };

  // custom validation

  /* const myValidation = (formData) => {
    let errors = {};
    if (formData.name == "") {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]{3,10}$/.test(formData.name)) {
      errors.name = "Name is not valid";
    }
    if (formData.phone == "") {
      errors.phone = "Phone is required";
    } else if (!/^01[1250][0-9]{8}$/.test(formData.phone)) {
      errors.phone = "Phone is not valid";
    }
    return errors;
  };
 */

  // yup validation

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min length is 3")
      .max(10, "Max length is 10")
      .required("Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "password min length is 6"),
    rePassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password not match"),
    phone: yup
      .string()
      .matches(/^01[1025][0-9]{8}$/, "Phone is not valid")
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
    // custom validation
    // validate: myValidation,

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
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg "
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg  "
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
