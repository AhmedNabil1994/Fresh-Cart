import { Link } from "react-router-dom";

export default function Category({ category }) {
  return (
    <>
      <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mb-[60px] group px-[15px]">
        <Link to={`/category/${category._id}/${category.name}`}>
          <div className="overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full object-cover aspect-square group-hover:scale-105 transition duration-700"
            />
          </div>
        </Link>
        <h2 className="text-center mt-2 group-hover:text-secondary font-semibold transition duration-500">
          {category.name}
        </h2>
      </div>
    </>
  );
}
