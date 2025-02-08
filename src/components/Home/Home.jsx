import { useEffect, useRef } from "react";
import RecentProducts from "../Products/RecentProducts/RecentProducts";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import CategoriesSlider from "../Categories/CategoriesSlider/CategoriesSlider";
import MainSlider from "./MainSlider/MainSlider";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";

// css module
// import style from "./Home.module.css";

export default function Home() {
  const topRef = useScrollToTop();

  return (
    <>
      <MetaTags metaTitle="Home" />
      <section ref={topRef}>
        <div className="overflow-hidden">
          <MainSlider />
        </div>
        <SectionHeader title="Categories" subtitle="Explore Our Categories" />
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
