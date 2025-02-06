import React from "react";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useProducts(
  url,
  theQueryKey,
  page = null,
  id = null,
  filterFn = null,
  category = null
) {
  const getProducts = () => {
    return axios.get(url);
  };

  const productsData = useQuery({
    queryKey: [theQueryKey, page, id, category],
    queryFn: getProducts,
    select: (products) => {
      let res = products?.data;
      return filterFn ? filterFn(res.data) : res;
    },
    placeholderData: page && keepPreviousData,
  });
  return productsData;
}
