import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import * as yup from "yup";
import { useFormik } from "formik";
import MetaTags from "../MetaTags/MetaTags";
import axios from "axios";
import toast from "react-hot-toast";
import { Tabs } from "flowbite-react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Account() {
  const { userData, setUserData, userToken } = useContext(UserContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [passVisible, setPassVisible] = useState({
    currentPassword: false,
    password: false,
    rePassword: false,
  });
  const headers = { token: userToken };

  const togglePassVisibility = (field) => {
    setPassVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateInfo = (formData) => {
    const toastId = toast.loading("Updating data...");
    setBtnLoading(true);
    let updatedFields = {};
    if (formData.name !== infoFormik.initialValues.name) {
      updatedFields.name = formData.name;
    }
    if (formData.email !== infoFormik.initialValues.email) {
      updatedFields.email = formData.email;
    }
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        updatedFields,
        {
          headers,
        }
      )
      .then((res) => {
        setBtnLoading(false);
        if (res.data.message === "success") {
          setApiError("");
          setUserData(res.data.user);
          toast.success("Data updated successfully.", {
            position: "top-center",
            style: { fontFamily: "sans-serif" },
            duration: 3000,
            id: toastId,
          });
          /*
             to disable button after update
               1-Update form fields with the new values
               2-Mark form as not dirty (Disables button)
           */
          infoFormik.resetForm({ values: res.data.user });
        } else {
          setBtnLoading(false);
          toast.error(res.response?.data?.errors?.msg, {
            position: "top-center",
            style: { fontFamily: "sans-serif" },
            id: toastId,
          });
        }
      })
      .catch((res) => {
        toast.error(res.response?.data?.errors?.msg, {
          position: "top-center",
          style: { fontFamily: "sans-serif" },
          id: toastId,
        });
        setBtnLoading(false);
        setApiError(res.response?.data?.errors?.msg);
      });
  };

  let infoValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min length is 3")
      .max(10, "Max length is 10")
      .required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
  });

  let infoFormik = useFormik({
    initialValues: {
      name: userData?.name,
      email: userData?.email,
    },
    validationSchema: infoValidationSchema,
    onSubmit: handleUpdateInfo,
  });

  const handleUpdatePassword = (formData) => {
    const toastId = toast.loading("Updating password...");
    setBtnLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        formData,
        {
          headers,
        }
      )
      .then((res) => {
        setBtnLoading(false);
        if (res.data.message === "success") {
          setApiError("");
          toast.success("Password updated successfully.", {
            position: "top-center",
            style: { fontFamily: "sans-serif" },
            duration: 3000,
            id: toastId,
          });
          passwordFormik.resetForm();
        } else {
          setBtnLoading(false);
          toast.error(
            res.response?.data?.errors?.msg || res.response?.data?.message,
            {
              position: "top-center",
              style: { fontFamily: "sans-serif" },
              id: toastId,
            }
          );
        }
      })
      .catch((res) => {
        toast.error(
          res.response?.data?.errors?.msg || res.response?.data?.message,
          {
            position: "top-center",
            style: { fontFamily: "sans-serif" },
            id: toastId,
          }
        );
        setBtnLoading(false);
        setApiError(res.response?.data?.errors?.msg);
      });
  };

  let passwordValidationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .matches(
        /^[A-Z](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{5,}$/,
        "Password must be at least 6 characters starting with a capital letter containing at least a number and a special character."
      )
      .required("Password is required")
      .min(6, "password min length is 6"),
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
  });

  let passwordFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: handleUpdatePassword,
  });

  return (
    <>
      <MetaTags metaTitle="Account" />
      <Tabs
        aria-label="Full width tabs"
        variant="fullWidth"
        className="lg:w-5/5 mx-auto mt-4 lg:mt-0 bg-white shadow-lg"
      >
        <Tabs.Item
          active
          title="Personal Info"
          icon={IoIosInformationCircleOutline}
        >
          <section className="lg:w-4/5 mx-auto mt-4 lg:mt-0">
            <div className="bg-white shadow-md p-4">
              <h1 className="mb-12 text-lg text-end">
                Welcome!
                <span className="text-secondary capitalize ms-1">
                  {userData?.name}
                </span>
              </h1>
              {apiError && (
                <div className="bg-red-600 text-white font-bold rounded-lg p-3 mb-3 text-center">
                  {apiError}
                </div>
              )}
              <h2 className="mb-4 text-xl font-medium text-secondary">
                Edit Your Info
              </h2>
              <form onSubmit={infoFormik.handleSubmit} className="row">
                <div className="w-full mb-4">
                  <div>
                    <label htmlFor="name" className="text-sm block mb-2">
                      Username
                    </label>
                    <input
                      value={infoFormik.values.name}
                      onChange={infoFormik.handleChange}
                      onBlur={infoFormik.handleBlur}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-600 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                    />
                    {infoFormik.errors.name && infoFormik.touched.name && (
                      <div className=" mt-2 text-sm text-red-700" role="alert">
                        <span className="font-medium">
                          {infoFormik.errors.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full mb-4">
                  <div>
                    <label htmlFor="email" className="text-sm block mb-2">
                      Email
                    </label>
                    <input
                      value={infoFormik.values.email}
                      onChange={infoFormik.handleChange}
                      onBlur={infoFormik.handleBlur}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-600 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                    />
                    {infoFormik.errors.email && infoFormik.touched.email && (
                      <div className=" mt-2 text-sm text-red-700" role="alert">
                        <span className="font-medium">
                          {infoFormik.errors.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={
                    !(infoFormik.isValid && infoFormik.dirty) || btnLoading
                  }
                  className={`${
                    !(infoFormik.isValid && infoFormik.dirty) || btnLoading
                      ? "bg-secondary/50"
                      : "bg-secondary"
                  } text-white rounded sm:px-12 py-4 font-medium hover:bg-opacity-90  transition-colors duration-500 w-full md:w-1/3`}
                >
                  {btnLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          </section>
        </Tabs.Item>
        <Tabs.Item
          title="Password"
          icon={RiLockPasswordFill}
          className="border-b-2 border-secondary !text-secondary focus:ring-0 focus:border-secondary"
        >
          <section className="lg:w-4/5 mx-auto mt-4 lg:mt-0">
            <div className="bg-white shadow-md p-4">
              <h1 className="mb-12 text-lg text-end">
                Welcome!
                <span className="text-secondary capitalize ms-1">
                  {userData?.name}
                </span>
              </h1>
              {apiError && (
                <div className="bg-red-600 text-white font-bold rounded-lg p-3 mb-3 text-center">
                  {apiError}
                </div>
              )}
              <h2 className="mb-4 text-xl font-medium text-secondary">
                Edit Your Password
              </h2>
              <form onSubmit={passwordFormik.handleSubmit} className="row">
                <div className="w-full mb-4 relative">
                  <input
                    value={passwordFormik.values.currentPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    type={passVisible.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    id="currentPassword"
                    className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                    placeholder="Current Password"
                  />
                  <div
                    className="absolute end-3 top-3 cursor-pointer"
                    onClick={() => togglePassVisibility("currentPassword")}
                  >
                    {passVisible.currentPassword ? (
                      <i className="fa-regular fa-eye fa-lg"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash fa-lg"></i>
                    )}
                  </div>
                  {passwordFormik.errors.currentPassword &&
                    passwordFormik.touched.currentPassword && (
                      <div className=" mt-2 text-sm text-red-700" role="alert">
                        <span className="font-medium">
                          {passwordFormik.errors.currentPassword}
                        </span>
                      </div>
                    )}
                </div>
                <div className="w-full mb-4 relative">
                  <input
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    type={passVisible.password ? "text" : "password"}
                    name="password"
                    id="password"
                    className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                    placeholder="New Password"
                  />
                  <div
                    className="absolute end-3 top-3 cursor-pointer"
                    onClick={() => togglePassVisibility("password")}
                  >
                    {passVisible.password ? (
                      <i className="fa-regular fa-eye fa-lg"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash fa-lg"></i>
                    )}
                  </div>
                  {passwordFormik.errors.password &&
                    passwordFormik.touched.password && (
                      <div className="mt-2 text-sm text-red-700" role="alert">
                        <span className="font-medium">
                          {passwordFormik.errors.password}
                        </span>
                      </div>
                    )}
                </div>
                <div className="w-full mb-4 relative">
                  <input
                    value={passwordFormik.values.rePassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    type={passVisible.rePassword ? "text" : "password"}
                    name="rePassword"
                    id="rePassword"
                    className=" bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                    placeholder="Confirm New Password"
                  />
                  <div
                    className="absolute end-3 top-3 cursor-pointer"
                    onClick={() => togglePassVisibility("rePassword")}
                  >
                    {passVisible.rePassword ? (
                      <i className="fa-regular fa-eye fa-lg"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash fa-lg"></i>
                    )}
                  </div>
                  {passwordFormik.errors.rePassword &&
                    passwordFormik.touched.rePassword && (
                      <div className="mt-2 text-sm text-red-700" role="alert">
                        <span className="font-medium">
                          {passwordFormik.errors.rePassword}
                        </span>
                      </div>
                    )}
                </div>
                <button
                  type="submit"
                  disabled={
                    !(passwordFormik.isValid && passwordFormik.dirty) ||
                    btnLoading
                  }
                  className={`${
                    !(passwordFormik.isValid && passwordFormik.dirty) ||
                    btnLoading
                      ? "bg-secondary/50"
                      : "bg-secondary"
                  } text-white rounded sm:px-12 py-4 font-medium hover:bg-opacity-90  transition-colors duration-500 w-full md:w-1/3`}
                >
                  {btnLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          </section>
        </Tabs.Item>
      </Tabs>
    </>
  );
}
