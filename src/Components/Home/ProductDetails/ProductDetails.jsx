import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StarRating from '../StarRating';
import Slider from "react-slick";

export default function ProductDetails() {
    const [lines, setLines] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // ✅ حالة التحميل
    let { id, category } = useParams();

    const settings = {
        customPaging: function (i) {
            return (
                <a className="block">
                    <img
                        className='myimg'
                        src={productDetails?.images ? productDetails.images[i] : ''}
                        alt={`Thumbnail ${i}`}
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data.data);
                setLines(data.data.description.split('\n'));
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false)); // ✅ إيقاف التحميل بعد استرجاع البيانات
    }

    function getProductRelatedProduct(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                let allRelatedProducts = allProducts.filter((product) => product.category.name === category);
                setRelatedProducts(allRelatedProducts);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        setIsLoading(true); // ✅ إعادة تعيين التحميل عند تغيير المنتج
        getProductDetails(id);
        getProductRelatedProduct(category);
    }, [id, category]);

    if (isLoading) {
        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-10 py-5 text-2xs font-medium leading-none text-center text-green-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                loading...
              </div>
            </div>
          );    }

    return (
        <div>
            <div className="md:h-[90vh] container flex flex-col md:flex-row md:gap-32 items-center text-center md:text-start md:mt-20">
                <div className="image w-96 md:w-[400px] p-5">
                    <Slider {...settings}>
                        {productDetails?.images?.map((src, index) => (
                            <img className='w-full' src={src} alt="" key={index} />
                        ))}
                    </Slider>
                </div>
                <div className='w-2/3 md:w-1/2 ml-10 img-details text-black'>
                    <p className='text-green-500'>{productDetails?.category?.name || "No Category"}</p>
                    <p className='mt-5 font-semibold text-3xl'>{productDetails?.title}</p>
                    <div className="mt-5 flex gap-2">
                        <StarRating rating={productDetails?.ratingsAverage} />
                        <p>{productDetails?.ratingsAverage}</p>
                        <p className='ml-2 text-green-500'>({productDetails.ratingsQuantity}) reviews</p>
                    </div>
                    <p className='mt-5 font-bold text-xl'>{productDetails.price} EGP</p>
                    <hr className='mt-5' />
                    <button className='font-medium mt-5 px-12 py-3 rounded-md bg-green-500 text-white hover:bg-green-600'>
                        <i className="font-thin pe-2 text-sm fa-solid fa-basket-shopping"></i> Add to cart
                    </button>
                    <hr className='mt-5' />
                    <div className='mt-5 text-gray-600'>
                        {lines.map((line, index) => {
                            const parts = line.split('\t');
                            if (parts.length === 2) {
                                const key = parts[0].trim();
                                const value = parts[1].trim();
                                return <p key={index}><br />{key}: {value}</p>;
                            } else {
                                return <p key={index}>{line}</p>;
                            }
                        })}
                    </div>
                </div>
            </div>

            <div className='mt-6 container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-black'>
                {relatedProducts.map((product) =>
                    <div key={product.id} className="cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-5">
                        <Link to={`/productDetails/${product?.id}/${product?.category?.name}`}>
                            <div className="product text-black">
                                <img className='w-full' src={product?.imageCover} />
                                <h4 className='text-gray-500 text-xs pt-5'>{product?.category?.name || "No Category"}</h4>
                                <h3 className='py-1'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                <div className='flex gap-1 py-2'>
                                    <StarRating rating={product.ratingsAverage} />
                                    <p className='text-gray-500 text-sm'>{product.ratingsAverage}</p>
                                </div>
                                <div className='py-1 flex justify-between items-center'>
                                    <span>{product.price} Egp</span>
                                    <button className='p-2 rounded-md text-sm text-white bg-green-500 hover:bg-green-600'>+ Add</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
