import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import useCategories from "../../../hooks/useCategories";

export default function CategorySubcategories({ catId, category }) {
  const {
    data: categorySubcategories,
    error,
    isError,
    isLoading,
    isFetching,
  } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`,
    "category-subcategories",
    catId
  );
  // console.log(categorySubcategories, "cat subcat");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : categorySubcategories?.length === 0 ? (
        <section className="text-center flex justify-center items-center flex-col dark:text-white">
          <h2 className="my-6 font-medium text-xl sm:text-2xl">
            There is no sub-categories for that category
          </h2>
        </section>
      ) : (
        <>
          <SectionHeader
            title={`${category}'s Category`}
            subtitle="All Subcategories"
          />
          {
            <section className="row mx-[-15px]">
              {categorySubcategories.map((subcat) => (
                <div
                  key={subcat._id}
                  className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mb-[60px] group px-[15px]  "
                >
                  <div className="border border-slate-400 py-20 shadow-slate-300 shadow-sm group-hover:border-secondary group-hover:shadow-secondary transition duration-500 dark:border-slate-300 dark:text-white">
                    <h2 className="text-center mt-2 group-hover:text-secondary font-semibold transition duration-500">
                      {subcat.name}
                    </h2>
                  </div>
                </div>
              ))}
            </section>
          }
        </>
      )}
    </>
  );
}
