import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
import Category from "./../Categories/Category/Category";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import useCategories from "../../hooks/useCategories";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Categories() {
useScrollToTop();

  const {
    data: categories,
    error,
    isError,
    isLoading,
  } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "all-categories"
  );
  // console.log(categories, "all categories in cat component");

  return (
    <>
      <MetaTags metaTitle="Categories" />
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ApiError error={error.response?.data.message} />
        ) : (
          categories && (
            <>
              <SectionHeader title="Categories" subtitle="Browse By Category" />
              <section className="row mx-[-15px]">
                {categories.map((category) => (
                  <Category key={category._id} category={category} />
                ))}
              </section>
            </>
          )
        )}
    </>
  );
}
