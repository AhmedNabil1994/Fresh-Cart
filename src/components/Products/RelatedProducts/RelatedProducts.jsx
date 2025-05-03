import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import ApiError from "../../shared/ApiError/ApiError";
import Loader from "../../shared/Loader/Loader";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import useProducts from "../../../hooks/useProducts";

export default function RelatedProducts() {
  let { category } = useParams();
  const filterByCategory = (products) => {
    return products?.filter((product) => product.category.name === category);
  };

  const {
    data: relatedProducts,
    isLoading,
    isError,
    error,
  } = useProducts(
    {
      apiUrl: `https://ecommerce.routemisr.com/api/v1/products`,
      queryKey: "related-products",
      filterFn: filterByCategory,
      category,
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ApiError error={error.response?.data.message} />
      ) : (
        <>
          <SectionHeader title="Related Item" subtitle="Related Products" />
          {relatedProducts && (
            <div className="row mx-[-15px]">
              {relatedProducts?.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
