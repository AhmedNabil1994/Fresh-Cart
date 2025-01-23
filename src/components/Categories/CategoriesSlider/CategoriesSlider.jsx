import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import Slider from "react-slick";

// css module
// import style from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const getCategories = () => {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setIsLoading(false);
        setCategories(data.data);
        setApiError(null);
        // console.log(data.data, "categories");
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response.data.message);
        setCategories([]);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  let settings = {
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
      ) : apiError ? (
        <ApiError error={apiError} />
      ) : (
        <div className="mb-36">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id} className="focus-visible:outline-none">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[200px] object-cover"
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
