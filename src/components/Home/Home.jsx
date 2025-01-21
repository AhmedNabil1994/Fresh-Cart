import { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../Products/RecentProducts/RecentProducts";

// css module
// import style from "./Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="lg:mx-16">
        <div className="ps-4">
          <div className="flex gap-x-[10px] mb-[30px] items-center">
            <div className="w-5 h-10 bg-secondary"></div>
            <h2 className="font-semibold text-secondary ">
              Recent Products
            </h2>
          </div>
          <h3 className="font-semibold text-2xl sm:text-4xl mb-[60px]">
            Explore Our Products
          </h3>
        </div>
        <RecentProducts />
      </section>
    </>
  );
}
