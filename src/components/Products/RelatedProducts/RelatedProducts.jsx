// css module
// import style from "./RelatedProducts.module.css";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../../hooks/useProducts";

export default function RelatedProducts() {
  let { category } = useParams();

  // const getRelatedProducts = () => {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  // };

  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getRelatedProducts,
  //   select: (products) =>
  //     products.data.data.filter(
  //       (product) => product.category.name === category
  //     ),
  // });
  // console.log(products);

  const filterByCategory = (products) => {
    return products?.filter((product) => product.category.name === category);
  };

  const {
    data: relatedProducts,
    isLoading,
    isError,
    error,
  } = useProducts(
    ...[
      `https://ecommerce.routemisr.com/api/v1/products`,
      "related-products",
      ,
      ,
      filterByCategory,
      category,
    ]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : (
        <>
          <SectionHeader title="Related Item" subtitle="Related Products" />
          {relatedProducts && (
            <div className="row mx-[-15px]">
              {relatedProducts?.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
