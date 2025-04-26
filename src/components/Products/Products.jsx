import { useState } from "react";
import ApiError from "../shared/ApiError/ApiError";
import Loader from "../shared/Loader/Loader";
import Product from "./Product/Product";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Search from "../Search/Search";
import useProducts from "../../hooks/useProducts";
import MetaTags from "../MetaTags/MetaTags";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Accordion, Dropdown } from "flowbite-react";
import { IoFilter } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { MdOutlinePriceChange, MdCategory } from "react-icons/md";
import ReactSlider from "react-slider";
import useCategories from "../../hooks/useCategories";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [priceSearchTriggered, setPriceSearchTriggered] = useState(false);
  const itemsPerPage = 20;
  const [priceValues, setPriceValues] = useState([100, 50000]);
  // to separate the UI input state from the committed filter state
  const [sliderPriceValues, setSliderPriceValues] = useState([100, 50000]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useScrollToTop();

  const apiUrl = () => {
    let url = `https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`;
    if (sort) url += `&sort=${sort}`;
    if (priceSearchTriggered) {
      url += `&price[gte]=${priceValues[0]}&price[lte]=${priceValues[1]}`;
    }
    if (selectedCategoryId) {
      url += `&category=${selectedCategoryId}`;
    }
    return url;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts({
    apiUrl: apiUrl(),
    queryKey: "allProducts",
    page: currentPage,
    sort,
    priceSearchTriggered,
    priceValues,
    category: selectedCategoryId,
  });

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
    setCurrentPage(1);
  };

  const handlePriceChange = () => {
    setPriceValues(sliderPriceValues);
    setCurrentPage(1);
    setPriceSearchTriggered(true);
  };

  const categories = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "all-categories"
  );
  // console.log(categories.data);
  const selectedCategory = categories?.data?.find(
    (category) => category._id === selectedCategoryId
  );

  return (
    <>
      <MetaTags metaTitle="Products" />
      <SectionHeader
        title="All Products"
        subtitle={`Explore Our Products  (${filteredProducts?.length})`}
        hasArrow
        handlePrev={prevPage}
        handleNext={nextPage}
        lastPage={totalPages}
        currentPage={currentPage}
      />

      <section className="w-full sm:flex gap-x-3">
        {/* sidebar */}
        <aside className=" bg-white shadow-md rounded-lg p-4 flex-shrink-0 w-full sm:w-80 self-start mb-6 sm:mb-0">
          <h2 className="text-xl font-bold mb-6">Filter By</h2>
          <Accordion className="border-none" alwaysOpen>
            <Accordion.Panel>
              <Accordion.Title className="bg-slate-200 dark:bg-slate-700 focus:ring-0">
                <div className="flex items-center gap-2">
                  <MdCategory className="w-5 h-5" />
                  <p>Category</p>
                </div>
              </Accordion.Title>
              <Accordion.Content className="dark:bg-transparent">
                <ul className="space-y-3">
                  <li>
                    <p
                      onClick={() => {
                        setSelectedCategoryId("");
                        setSort("");
                        setCurrentPage(1);
                      }}
                      className={`cursor-pointer py-1   ${
                        selectedCategoryId === ""
                          ? "text-black font-bold"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      All Products
                    </p>
                  </li>
                  {categories?.data?.map((category) => (
                    <li key={category._id}>
                      <p
                        onClick={() => {
                          setSelectedCategoryId(category._id);
                          setCurrentPage(1);
                        }}
                        className={`cursor-pointer py-1   ${
                          selectedCategoryId === category._id
                            ? "text-black font-bold"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {category.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="mt-6 border-none bg-slate-200 dark:bg-slate-700 focus:ring-0 ">
                <div className="flex items-center gap-2">
                  <MdOutlinePriceChange className="w-5 h-5" />
                  <p>Price</p>
                </div>
              </Accordion.Title>
              <Accordion.Content className="p-0 dark:bg-transparent">
                <ReactSlider
                  className="w-full h-1 bg-secondary price-slider my-6"
                  thumbClassName="thumb"
                  trackClassName="track"
                  defaultValue={[100, 50000]}
                  value={sliderPriceValues}
                  min={100}
                  max={50000}
                  step={100}
                  onChange={(value) => setSliderPriceValues(value)}
                  pearling
                  minDistance={10}
                />
                <div className="flex justify-between my-4">
                  <p>
                    <span className="text-slate-500 me-2">From:</span>
                    {sliderPriceValues[0]}EGP
                  </p>
                  <p>
                    <span className="text-slate-500 me-2">To:</span>
                    {sliderPriceValues[1]}EGP
                  </p>
                </div>
                <button
                  onClick={handlePriceChange}
                  className="bg-secondary w-full text-white p-2 rounded hover:bg-opacity-90 transition"
                >
                  Search
                </button>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </aside>
        {/* sidebar */}
        <section className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-x-3 lg:gap-x-0">
            <Search search={search} setSearch={setSearch} />
            <div className="flex items-center gap-x-6 lg:gap-x-0 mb-4 lg:mb-0">
              <Dropdown
                label={
                  <div
                    className={`p-2 rounded-full transition bg-red-500 text-white -mt-[30px]`}
                  >
                    <IoFilter size={25} />
                  </div>
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
              <p className="-mt-[30px] ms-2 font-medium text-lg text-black dark:text-white">
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
                        {search
                          ? "No Matched Products With This Name."
                          : selectedCategoryId
                          ? `There is no current products for ${selectedCategory?.name} category.`
                          : "No products available."}
                      </h2>
                    </section>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
}
