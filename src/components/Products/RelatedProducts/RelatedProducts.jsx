// css module
// import style from "./RelatedProducts.module.css";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RelatedProducts() {
  let { category } = useParams();

  const getRelatedProducts = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: () => getRelatedProducts(),
    select: (products) =>
      products.data.data.filter(
        (product) => product.category.name === category
      ),
  });
  console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : (
        <>
          <SectionHeader title="Related Item" subtitle="Related Products" />
          <div className="row mx-[-15px]">
            {products?.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
