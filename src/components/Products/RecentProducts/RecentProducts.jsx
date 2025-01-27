import Product from "../Product/Product";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
import { useQuery } from "@tanstack/react-query";
// css module
// import style from "./RecentProducts.module.css";

export default function RecentProducts() {
  const getRecentProducts = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    select: (products) => products.data.data,
  });
  // console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response.data.message} />
      ) : (
        <div className="row mx-[-15px]">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
