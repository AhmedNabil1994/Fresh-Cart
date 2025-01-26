import { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../Products/RecentProducts/RecentProducts";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import CategoriesSlider from "../Categories/CategoriesSlider/CategoriesSlider";
import MainSlider from "./MainSlider/MainSlider";

// css module
// import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className="lg:mx-16">
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
