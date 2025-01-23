import { useEffect, useState } from "react";
import Product from "../Product/Product";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";
import ApiError from "../../shared/ApiError/ApiError";
// css module
// import style from "./RecentProducts.module.css";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setIsLoading(false);
        setProducts(data.data);
        setApiError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response.data.message);
        setProducts([]);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {isloading ? (
        <Loader />
      ) : apiError ? (
        <ApiError error={apiError} />
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
