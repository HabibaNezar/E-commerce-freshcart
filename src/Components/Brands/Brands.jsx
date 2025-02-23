import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getAllCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getAllCategory,
  });

  const [showLoading, setShowLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000); // تأخير لمدة ثانيتين
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-10 py-5 text-2xs font-medium leading-none text-center text-green-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      </div>
    );
  }
  console.log('my-dataaa', data?.data?.data)


  return (
    <div className="min-h-screen mt-20 container w-full mb-7 grid grid-cols-5 gap-7">
      {data?.data?.data?.map((src, index) => (
        <Link key={src._id} to={`/brands/${src?.name}`}>
          <div key={index} className="relative w-full h-64 p-1 overflow-hidden">
            <img
              className="w-full h-full object-contain aspect-square cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-2"
              src={src.image}
              alt=""
            />
            <p className="cursor-pointer absolute inset-0 flex items-center justify-center text-xl text-white bg-green-600 bg-opacity-90 opacity-0 transition-opacity duration-300 hover:opacity-100 border rounded-xl p-2">
              {src.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
