import { Link, useParams } from "react-router-dom";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import Product from "../../Products/Product/Product";
import CategorySubcategories from "../CategorySubcategories/CategorySubcategories";
import MetaTags from "../../MetaTags/MetaTags";
import useCategories from "../../../hooks/useCategories";

export default function CategoryRelatedProducts() {
  let { categoryId, category } = useParams();
  // console.log(category,"cat");

  const {
    data: products,
    error,
    isError,
    isLoading,
    isFetching,
  } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    "products",
    categoryId
  );

  return (
    <>
      <MetaTags metaTitle="Related Products" />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : products?.length === 0 ? (
        <>
          <CategorySubcategories catId={categoryId} category={category} />
          <section className="text-center flex justify-center items-center flex-col">
            <h2 className="mb-6 font-medium text-xl sm:text-4xl">
              There is no current products for that category
            </h2>
            <p className="mb-8 text-lg">
              Back to
              <Link
                to="/categories"
                className="text-secondary font-semibold ms-2  hover:text-opacity-90 transition duration-300"
              >
                Categories
              </Link>
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="sm:mt-6 mt-0">
            <CategorySubcategories catId={categoryId} category={category} />
            <div className="flex justify-between">
              <SectionHeader
                title={`${category}'s Category`}
                subtitle="Related Products"
                relatedCategory
              />
              <p className="font-semibold">
                Back to
                <Link
                  to="/categories"
                  className="text-secondary font-semibold ms-2 hover:text-opacity-90 transition duration-300"
                >
                  Categories
                </Link>
              </p>
            </div>
            <div className="row mx-[-15px]">
              {products?.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
