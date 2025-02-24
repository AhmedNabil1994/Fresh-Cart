import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import useCategories from "../../../hooks/useCategories";
import { useParams } from "react-router-dom";

// css module
// import style from "./CategorySubcategories.module.css";

export default function CategorySubcategories({ catId, category }) {
  // const getCategorySubcategories = () => {
  //   return axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
  //   );
  // };
  // const { categoryId } = useParams();
  // console.log(useParams());

  // console.log(catId, "cat id");

  // const {
  //   data: categorySubcategories,
  //   isLoading,
  //   isError,
  //   error,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["category-subcategories"],
  //   queryFn: getCategorySubcategories,
  //   select: (subCats) => subCats.data.data,
  // });

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
        <section className="text-center flex justify-center items-center flex-col">
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
                  <div className="border border-slate-400 py-20 shadow-slate-300 shadow-sm group-hover:border-secondary group-hover:shadow-secondary transition duration-500">
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
