import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories(url, theQueryKey, catId) {
  const getCategories = () => {
    return axios.get(url);
  };

  const categoriesData = useQuery({
    queryKey: catId ? [theQueryKey, catId] : [theQueryKey],
    queryFn: getCategories,
    select: (categories) => categories.data.data,
    placeholderData: keepPreviousData,
  });
  return categoriesData;
}
