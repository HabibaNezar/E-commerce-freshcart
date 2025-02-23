import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
  
  let { setCart, getCartItems, removeCartProduct, updateCartProduct } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [isLoading, setIsLoading] = useState(true) // ✅ حالة اللودينج

  async function getCartData() {
    setIsLoading(true);
    let token = localStorage.getItem("userToken"); // ✅ جلب التوكن
  
    if (!token) {
      toast.error("Please login first");
      setIsLoading(false);
      return;
    }
  
    try {
      let response = await getCartItems(token); // ✅ إرسال التوكن
      setCartData(response.data);
      setCart(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching cart");
    } finally {
      setIsLoading(false);
    }
  }
  

  async function deleteCartData(id) {
    let response = await removeCartProduct(id)
    setCartData(response.data)
    if (response.data.status === 'success') { 
      toast.error('Item removed');
    }
  }

  async function updateCartData(id, count) {
    let response = await updateCartProduct(id, count)
    setCartData(response.data);
  }

  useEffect(() => {
    getCartData()
  }, [])

  return (
    <>
      {/* ✅ عرض اللودينج إذا كان تحميل البيانات قيد التنفيذ */}
      {isLoading && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="px-10 py-5 text-2xs font-medium leading-none text-center text-green-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            Loading...
          </div>
        </div>
      )}

      {/* ✅ إظهار سلة المشتريات بعد تحميل البيانات */}
      {!isLoading && cartData?.data?.products?.length > 0 ? (
        <div className="min-h-screen md:mt-28 container overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.data?.products?.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product Image" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateCartData(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" /></svg>
                      </button>
                      <div><span>{product.count}</span></div>
                      <button onClick={() => updateCartData(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" /></svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span onClick={() => deleteCartData(product.product.id)} className="cursor-pointer font-medium text-red-600 hover:underline">Remove</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={'/checkout'}>
            <button className='w-full bg-green-500 p-5 text-white hover:bg-green-600'>Check Out</button>
          </Link>
        </div>
      ) : (
        !isLoading && <p className="text-center text-gray-500">Your cart is empty</p>
      )}
    </>
  )
}
