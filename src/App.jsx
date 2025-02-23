import React from 'react';
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from '../src/Components/Layout/Layout'
import Home from'./../src/Components/Home/Home'
import Login from'./../src/Components/Authentication/Login/Login'
import Logout from'./../src/Components/Authentication/Logout/Logout'
import Register from'./../src/Components/Authentication/Register/Register'
import Brands from'./../src/Components/Brands/Brands'
import Cart from'./../src/Components/Cart/Cart'
import Categories from'./../src/Components/Categories/Categories'
import Products from'./../src/Components/Products/Product'
import WishList from'./../src/Components/WishList/WishList'
import 'flowbite';
import UserContextProvider from '../Context/UserContext';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';
import ProductDetails from './Components/Home/ProductDetails/ProductDetails';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from '../Context/CartContext';
import WishListContextProvider, { WishListContext } from '../Context/WishListContext.jsx';
import toast, {Toaster} from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout';
import ProductByCategory from './Components/Categories/ProductByCategory';
import ProductsByBrands from './Components/Brands/ProductsByBrands.jsx';
import ForgetPassword from './Components/Authentication/ForgetPassword/ForgetPassword.jsx';
function App() {

  let Query = new QueryClient()

  let router = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[
      {index:true , element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:'login' , element:<Login/>},
      {path:'logout' , element:<Logout/>},
      {path:'register' , element:<Register/>},
      {path:'brands' , element:<ProtectedRouting><Brands/></ProtectedRouting>},
      {path:'brands/:brand' , element:<ProtectedRouting><ProductsByBrands/></ProtectedRouting>},
      {path:'cart' , element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:'categories' , element:<ProtectedRouting><Categories/></ProtectedRouting>},
      {path:'products' , element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:'products/:category' , element:<ProtectedRouting><ProductByCategory/></ProtectedRouting>},
      {path:'wishlist' , element:<ProtectedRouting><WishList/></ProtectedRouting>},
      {path:'productDetails/:id/:category' , element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
      {path:'checkout' , element:<ProtectedRouting><Checkout/></ProtectedRouting>},
      {path:'forgot-password' , element:<ForgetPassword/>},
    ]}
  ],
  { basename: "/E-commerce" } // ✅ أضف هذا السطر

)
  
  
  return (
    <>
      <WishListContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={Query}>
            <UserContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ReactQueryDevtools/>
              <Toaster/>
            </UserContextProvider>
          </QueryClientProvider>
        </CartContextProvider>
      </WishListContextProvider>
    </>
  )
}

export default App
