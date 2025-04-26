import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <section className="text-center h-screen flex flex-col justify-center items-center dark:text-white">
        <h2 className="mb-10 font-medium text-4xl sm:text-6xl md:text-8xl lg:text-[110px]">
          404 Not Found
        </h2>
        <p className="mb-20">Unexpected Application Error</p>
        <Link
          to="/"
          className="text-base text-white font-medium bg-secondary focus:outline-none rounded px-6 sm:px-8 md:px-10 lg:px-12 py-4"
        >
          Back to home page
        </Link>
      </section>
    </>
  );
}
