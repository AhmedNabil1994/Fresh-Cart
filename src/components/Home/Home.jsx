import { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../Products/RecentProducts/RecentProducts";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import CategoriesSlider from "../Categories/CategoriesSlider/CategoriesSlider";

// css module
// import style from "./Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
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
          title="Categories"
          subtitle="Explore Our Categories"
        />
        <div className="overflow-hidden">

        <CategoriesSlider />
        </div>
        <SectionHeader
          title="Recent Products"
          subtitle="Explore Our Products"
        />
        <RecentProducts />
      </section>
    </>
  );
}
