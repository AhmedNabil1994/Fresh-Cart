import { useState } from "react";
import Slider from "react-slick";
import img1 from "../../../assets/home/slider-image-1-Dh9d2U6G.jpeg";
import img2 from "../../../assets/home/slider-image-2-Xt88XJy9.jpeg";
import img3 from "../../../assets/home/slider-image-3-BtMvVf4V.jpeg";

// css module
import style from "./MainSlider.module.css";

export default function MainSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    customPaging: (i) => (
      <div
        className={`h-4 w-4 rounded-full 
        ${
          i === activeSlide
            ? "bg-secondary outline-[3px] outline outline-white"
            : "bg-[#808080] "
        }`}
      ></div>
    ),
    dotsClass: `slick-dots ${style.custom}`,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const images = [
    {
      src: img1,
      title: "Vegetables Image",
    },
    {
      src: img2,
      title: "Wafer Rolls Image",
    },
    {
      src: img3,
      title: "Cookies Image",
    },
  ];

  return (
    <>
      <div className="mb-36">
        <Slider {...settings}>
          {images.map((image, idx) => (
            <img
              src={image.src}
              alt={image.title}
              key={idx}
              className="aspect-square sm:h-[400px] object-cover"
            />
          ))}
        </Slider>
      </div>
    </>
  );
}
