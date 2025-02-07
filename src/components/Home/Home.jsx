import { useEffect } from "react";
import RecentProducts from "../Products/RecentProducts/RecentProducts";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import CategoriesSlider from "../Categories/CategoriesSlider/CategoriesSlider";
import MainSlider from "./MainSlider/MainSlider";
import MetaTags from "../MetaTags/MetaTags";

// css module
// import style from "./Home.module.css";

export default function Home() {
  useEffect(() => {
    scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <MetaTags metaTitle="Home" />
      <div className="overflow-hidden">
        <MainSlider />
      </div>
      <SectionHeader title="Categories" subtitle="Explore Our Categories" />
      <div className="overflow-hidden">
        <CategoriesSlider />
      </div>
      <SectionHeader title="Recent Products" subtitle="Explore Our Products" />
      <RecentProducts />
    </>
  );
}
