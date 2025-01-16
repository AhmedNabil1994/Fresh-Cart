import React from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/forms/bg.png";
import googleIcon from "../../assets/forms/icon-google.png";


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
      <section className="register flex flex-wrap justify-around items-center gap-y-8 md:gap-y-0">
        <div className="w-full md:w-1/2">
          <div className="md:pe-3 lg:pe-0">
            <img src={img} alt="register image" className="w-full" />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <form className="md:ps-3 lg:ps-0" onSubmit={formik.handleSubmit}>
            <h2 className="text-2xl sm:text-4xl mb-3 font-medium">
              Create an account Edittttt
            </h2>
            <p className="mb-6">Enter your details below</p>
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
                  <span className="font-medium">
                    {formik.errors.rePassword}
                  </span>
                </div>
              )}
            </div>
            <div className="">
              <button
                type="submit"
                className="text-base text-white bg-secondary focus:outline-none font-medium rounded w-full  px-5 py-2.5 text-center mb-4"
              >
                Create Account
              </button>
            </div>
            <div>
              <button className="text-base capitalize text-black border-2 border-[#00000040] focus:outline-none font-medium rounded w-full px-5 py-2.5 text-center mb-8
              flex justify-center gap-x-4">
                {/* <i className="align-bottom text-2xl me-3 fa-brands fa-google text-transparent bg-[conic-gradient(from_90deg,_#4285F4_15%,_#34A853_15%_40%,_#FBBC04_40%_55%,_#EA4335_55%_90%,_#4285F4_90%)] bg-clip-text"></i> */}
                <img src={googleIcon} alt="google icon" />
                sign up with google
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have account?
            <Link
              className="font-medium underline ms-4 underline-offset-[6px]"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
