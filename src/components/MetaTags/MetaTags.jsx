import { useState } from "react";
import { Helmet } from "react-helmet";

// css module
// import style from "./MetaTags.module.css";

export default function MetaTags({ metaTitle }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{metaTitle}</title>
      </Helmet>
    </>
  );
}
