import { useFormik } from "formik";
import { useState } from "react";

// css module
// import style from "./ResetPassword.module.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetPasswordFormWrapper from "../ResetPasswordFormWrapper";

export default function ResetPassword() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (formData) => {
    setIsLoading(true);
    setBtnLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        formData
      )
      .then((res) => {
        setIsLoading(false);
        setBtnLoading(false);
        console.log("res in reset password",res);
        
        if (res.statusText === "OK") {
          setApiError("");
          navigate("/login");
        }
      })
      .catch((res) => {
        console.log(res, "forget password res");
        setIsLoading(false);
        setBtnLoading(false);
        setApiError(res.response.data.message);
      });
  };

  let validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    newPassword: yup
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
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <ResetPasswordFormWrapper title="Reset Password" apiError={apiError}>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full group mb-8">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="py-2 my-2 text-sm text-red-700" role="alert">
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            )}
          </div>
          <div className="relative z-0 w-full group mb-8">
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-secondary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="py-2 my-2 text-sm text-red-700" role="alert">
                <span className="font-medium">{formik.errors.newPassword}</span>
              </div>
            )}
          </div>
          <div className="mb-6">
            <button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
              className={`text-base text-white ${
                !(formik.isValid && formik.dirty) || isLoading
                  ? "bg-secondary/50"
                  : "bg-secondary"
              } focus:outline-none font-medium rounded px-12 py-4 text-center w-full`}
            >
              {btnLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Reset"
              )}
            </button>
          </div>
        </form>
      </ResetPasswordFormWrapper>
    </>
  );
}
