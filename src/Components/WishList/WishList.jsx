import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../Context/CartContext';
import { WishListContext } from '../../../Context/WishListContext';
import { Link } from 'react-router-dom';
import StarRating from '../Home/StarRating';
import toast from 'react-hot-toast';
import useProducts from './../Hooks/useProducts';

export default function WishList() {
    let { addToCart, setCart } = useContext(CartContext);
    let { getWishList, removeWishListProducts, WishList, setWishList } = useContext(WishListContext);
    let [loading, setLoading] = useState(true);
    let [likedProducts, setLikedProducts] = useState({}); // ✅ حالة لتتبع المنتجات المضغوط عليها

    async function getWishListProducts() {
        try {
            setLoading(true);
            let response = await getWishList();
            console.log(response.data);
            setWishList(response.data);

            // ✅ تعيين المنتجات الموجودة في الـ WishList كـ "معجبة"
            let likedState = {};
            response?.data?.data?.forEach(product => {
                likedState[product.id] = true;
            });
            setLikedProducts(likedState);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    }

    async function toggleLike(productId) {
        if (likedProducts[productId]) {
            // إذا المنتج مضاف للقائمة، قم بإزالته
            await deleteWishListData(productId);
        } 
        // ✅ تحديث حالة المنتج في الواجهة
        setLikedProducts(prevState => ({
            ...prevState,
            [productId]: !prevState[productId] 
        }));
    }

    async function deleteWishListData(id) {
        let response = await removeWishListProducts(id);
        console.log('remove', response?.data);

        if (response.data.status === 'success') { 
            toast.error('Item removed from wishlist');

            setWishList(prevWishList => ({
                ...prevWishList,
                data: prevWishList?.data?.filter(product => product.id !== id)
            }));
        }
    }

    async function addProduct(proId) {
        let response = await addToCart(proId);
        setCart(response?.data);
        console.log('to see status', response.data);

        if (response?.data?.status === 'success') {
            toast.success('Successfully Added to your cart');
        } else {
            toast.error('Failed to add to cart');
        }
    }

    useEffect(() => {
        getWishListProducts();
    }, []);

    let { data, isLoading, error } = useProducts();

    return (
        <div className="mt-20 container">
            {loading ? (
                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <div className="px-10 py-5 text-2xs font-medium leading-none text-center text-green-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                        Loading...
                    </div>
                </div>
            ) : (
                <div className='container grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:mt-24 text-black'>
                    {WishList?.data?.map((product, index) => (
                        <div key={product?.id || index} className="cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-5">
                            <Link to={`/productDetails/${product?.id}/${product?.category?.name}`}>
                                <div className="product text-black">
                                    <img className='w-full' src={product?.imageCover} alt={product?.title} />
                                    <h4 className='text-gray-500 text-xs pt-5'>{product?.category?.name}</h4>
                                    <h3 className='py-1'>{product?.title?.split(' ').slice(0, 2).join(' ')}</h3>
                                    <div className='flex gap-1 py-2'>
                                        <StarRating rating={product?.ratingsAverage} />
                                        <p className='text-gray-500 text-sm'>{product?.ratingsAverage}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='py-1 flex justify-between items-center'>
                                <span className='text-black'>{product?.price} Egp</span>
                                <div>
                                    {/* ✅ تغيير أيقونة القلب بناءً على حالة الـ like */}
                                    <i 
                                        onClick={() => toggleLike(product?.id)}
                                        className={`text-2xl mr-2 transition-all duration-200 ease-in-out hover:scale-110 ${
                                            likedProducts[product?.id] ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-600'
                                        }`}
                                    ></i>

                                    <button onClick={() => addProduct(product?.id)} className='p-2 rounded-md text-sm text-white bg-green-500 hover:bg-green-600'>+ Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
