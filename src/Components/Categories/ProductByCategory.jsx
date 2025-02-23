import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarRating from "../Home/StarRating";

export default function ProductByCategory() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ حالة التحميل
  let { category } = useParams();

  console.log("Category from URL Params:", category);

  function getProductRelatedProduct(category) {
    setLoading(true); // ✅ تفعيل الـ loading قبل جلب البيانات
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log("All Products:", data.data);
        let allProducts = data.data;

        let allRelatedProducts = allProducts.filter((product) => {
          console.log("Product Category Name:", product.category?.name);
          return product.category?.name?.toLowerCase() === category.toLowerCase();
        });

        console.log("Filtered Products:", allRelatedProducts);
        setRelatedProducts(allRelatedProducts);
        setLoading(false); // ✅ تعطيل الـ loading بعد تحميل البيانات
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // ✅ تعطيل الـ loading في حالة الخطأ
      });
  }

  useEffect(() => {
    if (category) {
      getProductRelatedProduct(category);
    }
  }, [category]);

  if (loading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-10 py-5 text-2xs font-medium leading-none text-center text-green-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-black">
      {relatedProducts.map((product) => (
        <div
          key={product.id}
          className="cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-5"
        >
          <Link to={`/productDetails/${product?.id}/${product?.category?.name}`}>
            <div className="product text-black">
              <img className="w-full" src={product?.imageCover} alt={product.title} />
              <h4 className="text-gray-500 text-xs pt-5">
                {product?.category?.name}
              </h4>
              <h3 className="py-1">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
              <div className="flex gap-1 py-2">
                <StarRating rating={product.ratingsAverage} />
                <p className="text-gray-500 text-sm">{product.ratingsAverage}</p>
              </div>
              <div className="py-1 flex justify-between items-center">
                <span>{product.price} Egp</span>
                <button className="p-2 rounded-md text-sm text-white bg-green-500 hover:bg-green-600">
                  + Add
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
