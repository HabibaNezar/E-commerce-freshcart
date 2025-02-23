import { Link, NavLink, useNavigate } from "react-router-dom"
import React , {useContext , useEffect , useState} from 'react';
import img1 from '../../assets/nav.svg';
import style from './Navbar.module.css';
import { userContext } from "../../../Context/UserContext";
import { CartContext } from "../../../Context/CartContext";

export default function Navbar() {
  
  let{userLogin , setUserLogin} = useContext(userContext)
  let navigate = useNavigate()
  let{cart} = useContext(CartContext)

  function logout(){
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/login')
  }

  return (
    <>
      <nav className="z-50 bg-white border-gray-200 shadow-md fixed top-0 right-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-4">
          <NavLink to={'./'}href="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={img1} className="h-8 " alt="" />
          </NavLink>
          <button data-collapse-toggle="navbar-default" type="button" className={` ${style.navbar} inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green- dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} aria-controls="navbar-default" aria-expanded="false">
              <span className={` sr-only`}>Open main menu</span>
              <svg className={`w-5 h-5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="md:flex flex-row  hidden gap-7 md:w-auto absolute top-full left-0 right-0 bg-white  md:static md:bg-transparent w-full" id="navbar-default">
            {userLogin !== null ?
            
            <ul className="text-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li >
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `} to={'./'}>Home</NavLink>
              </li>
              <li>
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `} to={'./cart'}>Cart</NavLink>
              </li>
              <li>
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `} to={'./wishlist'}>Wish list</NavLink>              
              </li>
              <li>
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `} to={'./products'}>Products</NavLink>                
              </li>
              <li>
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `} to={'./categories'}>Categories</NavLink>                
              </li>
              <li>
                <NavLink className={({isActive})=> isActive?`block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 `}to={'./brands'}>Brands</NavLink>                
              </li>
              <li onClick={logout} className="lg:pl-48 cursor-pointer block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white">
                Logout
              </li>
              <li>                
                <Link to={'./cart'}>
                  <button type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cart?.numOfCartItems}</div>
                  </button>
                </Link>

              </li>
              
            </ul> 
            :null} 

        {userLogin == null ?
            <ul className="text-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li>
                <NavLink className={({isActive})=> isActive? `block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :  `block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white`} to={'./login'}>Login</NavLink>                
              </li>
              <li>
                <NavLink className={({isActive})=> isActive? `block py-2 px-3 text-green-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white` :  `block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-green-700 md:p-0 dark:text-white`} to={'./register'}>Register</NavLink>                
              </li>
            </ul>
           :null}   
          </div>
         
        </div>
      </nav>
    </>
  )
}
