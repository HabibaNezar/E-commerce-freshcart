import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../../../Context/WishListContext'

export default function RecentProducts() {
  let { addToCart, setCart } = useContext(CartContext)
  let { addToWishList, setWishList } = useContext(WishListContext)
  let [likedProducts, setLikedProducts] = useState({})
  let [searchTerm, setSearchTerm] = useState('')

  async function addProduct(proId) {
    let response = await addToCart(proId)
    setCart(response?.data)
    response?.data?.status === 'success'
      ? toast.success('Successfully Added to your cart')
      : toast.error('Error adding to cart')
  }

  async function toggleWishList(proId) {
    let response = await addToWishList(proId)
    setWishList(response?.data)
    response?.data?.status === 'success'
      ? toast.success('Added to Wishlist')
      : toast.error('Error adding to wishlist')

    setLikedProducts(prevState => ({
      ...prevState,
      [proId]: !prevState[proId]
    }))
  }

  let { data, isLoading, error } = useProducts()

  useEffect(() => {
    console.log("Fetched Products Data:", data);
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching products</div>

  const filteredProducts = data?.data?.data?.filter(product => 
    product?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
    product?.category?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  ) || [];

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className='container'>

      {/* ✅ شريط البحث */}
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log("Search Term Updated:", e.target.value);
          }}
        />
      </div>

      {/* ✅ عرض المنتجات بعد التصفية */}
      <div className='grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:mt-6 text-black'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-5">
              <Link to={`/productDetails/${product?.id}/${product?.category?.name}`}>
                <div className="product text-black">
                  <img className='w-full' src={product?.imageCover} alt={product.title} />
                  <h4 className='text-gray-500 text-xs pt-5'>{product?.category?.name}</h4>
                  <h3 className='py-1'>{product?.title?.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className='flex gap-1 py-2'>
                    <StarRating rating={product.ratingsAverage} />
                    <p className='text-gray-500 text-sm'>{product.ratingsAverage}</p>
                  </div>
                </div>
              </Link>
              <div className='py-1 flex justify-between items-center'>
                <span className='text-black'>{product.price} Egp</span>
                <div>
                  <i 
                    onClick={() => toggleWishList(product?.id)}
                    className={`text-2xl mr-2 transition-all duration-200 ease-in-out hover:scale-110 hover:text-red-500 ${
                      likedProducts[product?.id] ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart text-gray-600'
                    }`}
                  ></i>
                  <button onClick={() => addProduct(product.id)} className='p-2 rounded-md text-sm text-white bg-green-500 hover:bg-green-600'>+ Add</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found
          </div>
        )}
      </div>

    </div>
  )
}
