import { useState } from "react";
import ApiError from "../shared/ApiError/ApiError";
import Loader from "../shared/Loader/Loader";
import Product from "./Product/Product";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Search from "../Search/Search";
import useProducts from "../../hooks/useProducts";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Dropdown } from "flowbite-react";
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
// test
import { Sidebar } from "flowbite-react";
import { MdOutlinePriceChange, MdCategory } from "react-icons/md";
import ReactSlider from "react-slider";
import Slider from "@mui/material/Slider";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [priceValues, setPriceValues] = useState([100, 50000]);
  const itemsPerPage = 20;

  useScrollToTop();

  const getApiUrl = () => {
    let url = `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`;
    sort && (url += `&sort=${sort}`);
    return url;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts(getApiUrl(), "allProducts", sort, currentPage);
  // console.log(products, "products res");

  const totalPages = Math.ceil(products?.results / itemsPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const filteredProducts = products?.data.filter((product) =>
    search.toLowerCase() === ""
      ? product
      : product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (order) => {
    setSort(order);
  };

  return (
    <>
      <MetaTags metaTitle="Products" />
      <SectionHeader
        title="All Products"
        subtitle={`Explore Our All Products (${products?.results})`}
        hasArrow
        handlePrev={prevPage}
        handleNext={nextPage}
        lastPage={totalPages}
        currentPage={currentPage}
      />
      <section className="sm:flex gap-x-3">
        {/* test */}
        <Sidebar
          aria-label="Sidebar with multi-level dropdown"
          className="w-full sm:w-auto mb-8"
        >
          <Sidebar.Items className="pb-40">
            <Sidebar.ItemGroup className="">
              <Sidebar.Item className="text-lg font-bold hover:bg-transparent">
                Filter By
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={MdCategory}
                label="Category"
                className="flex"
              >
                <Sidebar.Item href="#">All Products</Sidebar.Item>
                {/* list all categories */}
                <Sidebar.Item href="#">Sales</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={MdOutlinePriceChange} label="Price">
                {/* range slider */}

                {/* <ReactSlider
                  className="w-full h-1 bg-secondary price-slider !my-4"
                  thumbClassName="thumb"
                  trackClassName="track"
                  defaultValue={[100, 50000]}
                  // value={priceValues}
                  min={100}
                  max={50000}
                  // step={100}
                  // onChange={(value, index) => setPriceValues(value)}
                  // onChange={handleSliderChange}
                  pearling
                  minDistance={100}
                  renderThumb={(props, state) => (
                    <div {...props}>{state.valueNow}</div>
                  )}
                /> */}

                <Slider
                  value={priceValues}
                  min={100}
                  max={50000}
                  // onChangeCommitted={(_, value) => setPriceValues(value)}
                  onChange={(_, value) => setPriceValues(value)}
                />

                {/* range slider */}

                <div className="flex gap-x-3 justify-between">
                  <p>
                    <span className="text-slate-500 me-2">From:</span>
                    {priceValues[0]}EGP
                  </p>
                  <p>
                    <span className="text-slate-500 me-2">To:</span>
                    {priceValues[1]}EGP
                  </p>
                </div>
                <button className="bg-secondary w-full text-white p-2 rounded hover:bg-opacity-90 transition-colors duration-300">
                  Search
                </button>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        {/* test */}

        <div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-3 lg:gap-x-0">
            <Search search={search} setSearch={setSearch} />
            <div className="flex items-center gap-x-6 lg:gap-x-0 mb-4 lg:mb-0">
              <Dropdown
                label={
                  <button
                    className={`p-2 rounded-full transition bg-red-500 text-white -mt-[30px]`}
                  >
                    <IoFilter size={25} />
                  </button>
                }
                className="bg-[#a19da2] rounded-lg shadow-sm p-2"
                arrowIcon={false}
                inline
              >
                <Dropdown.Item
                  onClick={() => handleSort("-price")}
                  icon={FaSortAmountDown}
                  className="text-white hover:bg-transparent focus:bg-transparent"
                >
                  High to Low
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSort("price")}
                  icon={FaSortAmountUp}
                  className="text-white hover:bg-transparent focus:bg-transparent"
                >
                  Low to High
                </Dropdown.Item>
              </Dropdown>
              <p className="-mt-[30px] ms-2 font-medium text-lg text-black">
                Sort By
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ApiError error={error.response?.data.message} />
          ) : (
            <>
              {filteredProducts && (
                <>
                  {filteredProducts.length > 0 ? (
                    <>
                      <section className="row mx-[-15px]">
                        {filteredProducts.map((product) => (
                          <Product
                            product={product}
                            key={product.id}
                            search={search}
                          />
                        ))}
                      </section>
                    </>
                  ) : (
                    <section className="my-20 text-center flex justify-center items-center flex-col">
                      <h2 className="font-medium text-xl sm:text-2xl text-secondary">
                        No Matched Products With This Name.
                      </h2>
                    </section>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
