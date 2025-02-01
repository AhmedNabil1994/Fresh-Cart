import React from "react";
// import style from "./Brands.module.css";
import Brand from "../Brands/Brand/Brand";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../shared/Loader/Loader";
import ApiError from "../shared/ApiError/ApiError";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

export default function Brands() {
  const getBrands = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  };

  const {
    data: brands,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getBrands,
    select: (brands) => brands.data.data,
  });
  console.log(brands, "all brands ");

  return (
    <>
      <>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ApiError error={error.response.data.message} />
        ) : (
          brands && (
            <>
              <SectionHeader
                title="Brands"
                subtitle="Explore Our All Brands"
              />
              <section className="row mx-[-15px]">
                {brands.map((brand) => (
                  <Brand key={brand._id} brand={brand} />
                ))}
              </section>
            </>
          )
        )}
      </>
    </>
  );
}
