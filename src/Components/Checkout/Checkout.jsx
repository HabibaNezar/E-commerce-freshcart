import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'
import { CartContext } from '../../../Context/CartContext';

export default function Checkout() {

    let navigate = useNavigate()
    const[apiError , setApiError]= useState('');
    const[loading,setLoading]=useState(false);
    let{checkOut} = useContext(CartContext)
  
    let formik = useFormik({
        initialValues: {
            phone: '',
            city: '',
        },
        onSubmit: (values) => handleCheckOut('674f60bc59d41d50cf3dcd27', 'http://localhost:3000', values),
    });    

    async function handleCheckOut(cartID, url, values) {
        let { data } = await checkOut(cartID, url, values);
        console.log(data.session.url);
        if (data.status === 'success') {
            window.location.href = data.session.url;
        }
    }
    
   
  
    return (
        <>
          <form className="mt-52 w-2/3 lg:w-1/3 mx-auto" onSubmit={formik.handleSubmit}>
            
            <div className="mb-5">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="phone" id="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
              
            </div>
            <div className="mb-5">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name='city' type="city" id="city" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
            </div>
            <div className='flex flex-row justify-between'>
              <button className='bg-green-500 w-full py-2 text-white hover:bg-green-600 rounded'>Check Out</button>
            </div>
          </form>
        </>
      )
}
