import React from "react";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useProducts(
  url,
  theQueryKey,
  page,
  id,
  filterFn,
  category
) {
  
  const getProducts = () => {
    return axios.get(url);
  };

  const queryKey = [theQueryKey];
  page && queryKey.push(page);
  id && queryKey.push(id);
  category && queryKey.push(category);

  const productsData = useQuery({
    queryKey,
    queryFn: getProducts,
    select: (products) => {
      let res = products?.data;
      return filterFn ? filterFn(res.data) : res;
    },
    placeholderData: page && keepPreviousData,
  });
  return productsData;
}
