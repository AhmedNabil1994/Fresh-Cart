import axios from "axios";
import { useState } from "react";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useCategories from "../../../hooks/useCategories";

// css module
// import style from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const [isFocused, setIsFocused] = useState(false);
  const { data: categories, error, isError, isLoading } = useCategories();
  // console.log(categories,"categories");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        <div className="mb-36">
          <Slider {...settings}>
            {categories.map((category) => (
              <div
                aria-hidden={isFocused ? "false" : "true"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                key={category._id}
                className="focus-visible:outline-none"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full object-cover aspect-square"
                />
                <h2 className="text-center mt-2 hover:text-secondary transition duration-500">
                  {category.name}
                </h2>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
