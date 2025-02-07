import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  const getCategories = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  };

  const categoriesData = useQuery({
    queryKey: ["all-categories"],
    queryFn: getCategories,
    select: (categories) => categories.data.data,
  });
  return categoriesData;
}
