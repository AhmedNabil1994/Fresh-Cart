import { Helmet } from "react-helmet";

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
