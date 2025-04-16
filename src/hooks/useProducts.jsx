import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useProducts({
  apiUrl,
  queryKey,
  page,
  id,
  filterFn,
  category,
  sort,
  priceSearchTriggered,
  priceValues,
}) {
  const getProducts = () => {
    return axios.get(apiUrl);
  };

  const finalQueryKey = [
    queryKey,
    ...(page ? [page] : []), //spread the element in that array into finalQueryKey array
    ...(id ? [id] : []),
    ...(category ? [category] : []),
    ...(sort ? [sort] : []),
    ...(priceSearchTriggered && priceValues
      ? [`price-${priceValues[0]}-${priceValues[1]}`]
      : []),
  ];

  const productsData = useQuery({
    queryKey: finalQueryKey,
    queryFn: getProducts,
    select: (products) => {
      let res = products?.data;
      return filterFn ? filterFn(res.data) : res;
    },
    placeholderData: page && keepPreviousData,
  });
  return productsData;
}
