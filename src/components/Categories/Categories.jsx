import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
// import React from "react";
// import style from "./Categories.module.css";
import Category from "./../Categories/Category/Category";
import Product from "../Products/Product/Product";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

export default function Categories() {
  const getCategories = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  };
  const {
    data: categories,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCategories,
    select: (categories) => categories.data.data,
  });
  // console.log(categories, "all categories in cat component");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
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
