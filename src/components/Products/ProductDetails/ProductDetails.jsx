import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import Product from "../Product/Product";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";

// css module
// import style from "./ProductDetails.module.css";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();

  const getProduct = (id) => {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        setProduct(data.data);
        setApiError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response.data.message);
        setProduct(null);
      });
  };

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setIsLoading(false);
        let related = data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
        setApiError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response.data.message);
      });
  };

  useEffect(() => {
    getProduct(id);
    getProducts();
  }, [id, category]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : apiError ? (
        <ApiError error={apiError} />
      ) : (
        <>
          {product && (
            <div className="row justify-between gap-y-4 mb-[140px]">
              <div className="w-full md:w-2/12">
                <div className="row flex-row md:flex-col justify-evenly md:justify-center items-end gap-y-4">
                  {product.images.map((img, idx) => (
                    <img
                      src={img}
                      alt={product.title}
                      key={idx}
                      className="w-[170px] aspect-[170/138]"
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:w-5/12">
                <div>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="object-cover w-full md:w-[500px] aspect-[500/600] mx-auto"
                  />
                </div>
              </div>
              <div className="w-full md:w-4/12">
                <div>
                  <h2 className="text-2xl font-semibold font-inter">
                    {product.title}
                  </h2>
                  <div className="row my-4">
                    <div className="stars">
                      <i className="fas fa-star text-[#FFAD33]"></i>
                      <i className="fas fa-star text-[#FFAD33]"></i>
                      <i className="fas fa-star text-[#FFAD33]"></i>
                      <i className="fas fa-star opacity-25"></i>
                      <i className="fas fa-star opacity-25"></i>
                    </div>
                    <p className="ms-2 opacity-50 me-4">
                      ({product.reviews.length || 150} Reviews)
                    </p>
                    <p>
                      <span className="opacity-50">|</span>
                      <span className="ms-4 text-sm text-[#00FF66] opacity-60">
                        {product.quantity > 0 && "In Stock"}
                      </span>
                    </p>
                  </div>
                  <p className="text-2xl">${product.price}</p>
                  <p className="relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-gray-500 after:mt-6 mt-6 ">
                    {product?.description}
                  </p>
                  <div className="row justify-between items-center mt-6 gap-y-2">
                    <div className="rounded flex">
                      <button className=" text-3xl px-3 border-2 rounded-l">
                        -
                      </button>
                      <p className="text-xl px-[34px] border-y-2 leading-8">
                        2
                      </p>
                      <button className=" text-3xl px-3 border-2 border-secondary bg-secondary text-white rounded-r">
                        +
                      </button>
                    </div>
                    <button className="font-medium bg-secondary text-white rounded py-2 px-12">
                      Buy Now
                    </button>
                    <i className="fa fa-regular fa-heart border-2 border-slate-400 opacity-75 rounded text-xl p-1"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="">
            <SectionHeader title="Related Item" subtitle="Related Products" />
          </div>
          <div className="row mx-[-15px]">
            {relatedProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
