import { useFormik } from "formik";
import { useState } from "react";

// css module
// import style from "./ForgetPassword.module.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetPasswordFormWrapper from "../ResetPasswordFormWrapper";

export default function ForgetPassword() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleForget = (formData) => {
    setIsLoading(true);
    setBtnLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        formData
      )
      .then((res) => {
        setIsLoading(false);
        setBtnLoading(false);
        if (res.data.statusMsg === "success") {
          setApiError("");
          navigate("/verifyresetcode");
        }
      })
      .catch((res) => {
        // console.log(res, "forget password res");
        setIsLoading(false);
        setBtnLoading(false);
        setApiError(res.response.data.message);
      });
  };

  let validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForget,
  });

  return (
    <>
      <ResetPasswordFormWrapper title="Forget Password" apiError={apiError}>
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
                "Send Code"
              )}
            </button>
          </div>
        </form>
      </ResetPasswordFormWrapper>
    </>
  );
}
