import { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../Products/RecentProducts/RecentProducts";
import SectionHeader from "../shared/SectionHeader/SectionHeader";


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
        <SectionHeader
          title="Recent Products"
          subtitle="Explore Our Products"
        />
        <RecentProducts />
      </section>
    </>
  );
}
