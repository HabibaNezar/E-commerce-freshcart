import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let CartContext = createContext();
export default function CartContextProvider(props){
   
    let[cart , setCart] = useState(null)

   let headers = {
    token: localStorage.getItem('userToken')
   }

   function addToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , 
        { productId:productId},
        {headers: { token: localStorage.getItem("userToken") }}
    ).then((response)=> response)
    .catch((error)=>error)
   }

   function getCartItems(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {headers: { token: localStorage.getItem("userToken") }},
    ).then((response)=>response)
    .catch((error)=>error)
   }

   function removeCartProduct(proId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`
        ,{headers: { token: localStorage.getItem("userToken") }}
    ).then((response)=> response)
    .catch((error)=> error)
   }

   function updateCartProduct(proId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`,
        {count},
        {headers: { token: localStorage.getItem("userToken") }}
    ).then((response)=> response)
    .catch((error)=> error)
   }

   function checkOut(cartID , url , formValues){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,
      {shippingAddress:formValues},
      {headers: { token: localStorage.getItem("userToken") }}
    ).then((response)=> response)
    .catch((error)=> error)
  }

  async function getCart(){
    let response = await getCartItems()
    setCart(response.data)
  }

  useEffect(()=>{
    let token = localStorage.getItem("userToken");
    if (token) {
    getCart();
    }
},[])
   
   return <CartContext.Provider value={{addToCart , getCartItems , removeCartProduct , updateCartProduct , checkOut , cart , setCart}}>

        {props.children}
        </CartContext.Provider>
}