import { useState } from "react";
import { Link } from "react-router-dom";
// css module
// import style from "./Product.module.css";

export default function Product({ product }) {
  /* 
    prevent link behavior in add to cart
    add the logic here--
  */
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("added to cart", product.id);
  };
  return (
    <>
      <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 sm:px-[15px] mb-[60px] group">
        <Link to={`productdetails/${product.id}`}>
          <div>
            <div className="bg-[#F5F5F5] relative rounded mb-4">
              <i className="fa-regular fa-heart absolute top-3 end-3 p-2 "></i>
              <img
                src={product.imageCover}
                alt={product.title}
                className="p-8"
              />
              <button
              onClick={handleAddToCart}
               className="absolute inset-x-0 bottom-0 capitalize bg-black text-white text-center w-full py-2 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                add to cart
              </button>
            </div>
            <h3 className="font-semibold text-xl text-secondary mb-2 line-clamp-1">
              {product.category.name}
            </h3>
            <h3 className="font-medium mb-2 line-clamp-1">{product.title}</h3>
            <div className="flex">
              <span className="text-secondary me-2">${product.price}</span>
              <div className="stars">
                <i className="fas fa-star text-[#FFAD33]"></i>
                <i className="fas fa-star text-[#FFAD33]"></i>
                <i className="fas fa-star text-[#FFAD33]"></i>
                <i className="fas fa-star opacity-25"></i>
                <i className="fas fa-star opacity-25"></i>
              </div>
              <span className="opacity-50 ms-2">({product.quantity})</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
