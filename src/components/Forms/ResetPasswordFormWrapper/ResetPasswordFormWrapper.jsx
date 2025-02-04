import { useState } from "react";

// css module
// import style from "./ResetPasswordFormWrapper.module.css";

export default function ResetPasswordFormWrapper({
  title,
  apiError,
  children,
}) {
  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto bg-gray-50 shadow-md rounded-md p-6">
        <h2 className="mb-6 text-2xl sm:text-4xl font-medium text-center">
          {title}
        </h2>
        {apiError && (
          <div className="bg-secondary text-white font-bold rounded-lg p-3 mb-6 text-center">
            {apiError}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
