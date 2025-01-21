import { useEffect, useState } from "react";
import Product from "../Product/Product";
import axios from "axios";
import Loader from "../../shared/Loader/Loader";
// css module
// import style from "./RecentProducts.module.css";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const getProducts = () => {
    setIsloading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setIsloading(false);
        setProducts(data.data);
        console.log(data.data);
        setApiError(null);
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error);
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
        <div className="alert-error">{apiError}</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
