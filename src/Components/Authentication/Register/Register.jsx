import React, {useContext, useState } from 'react'
import {useFormik} from 'formik'
import style from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import { userContext } from '../../../../Context/UserContext'
import { CartContext } from '../../../../Context/CartContext'
export default function Register() {
  
  let navigate = useNavigate()
  const[apiError , setApiError]= useState('');
  const[loading,setLoading]=useState(false);
  let{setUserLogin} = useContext(userContext)
  let{setCart} = useContext(CartContext)

  let validationSchema = yup.object().shape({
    name:yup.string().min(3 , 'name should be more or equal 3').max(20,'name max length is 10').required('name is required'),
    email:yup.string().email('email invalid').required('email is required'),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone is invalid'),
    password:yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is invalid').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref('password')] , 'rePassword invalid')
  })

  function handleRegister(values) {
    console.log(values);
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then(
      (apiResp)=>
      {
        setLoading(false)
        console.log(apiResp)
        console.log(apiResp.data.token)
        localStorage.setItem('userToken' , apiResp.data.token)
        setCart(null)
        setUserLogin(apiResp.data.token)
        navigate('/')
      }
    )
    .catch(
      (apiResp)=>{
        setLoading(false)
        setApiError(apiResp.response.data.message);
        console.log(apiResp.response.data.message);
      }
    )
  }


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    onSubmit:handleRegister,
    validationSchema
  })

  
  
  
  
  return (
    <>
      <form className="md:mt-32 w-2/3 lg:w-1/3 mx-auto" onSubmit={formik.handleSubmit}>
        
        {apiError? 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>:null
        }
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
          {formik.errors.name && formik.touched.name?
          <div className="p-2.5 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span> 
          </div>:null  
          }
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
          {formik.errors.email && formik.touched.email?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span> 
          </div>:null  
          }
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
          {formik.errors.password && formik.touched.password?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span> 
          </div>:null  
          }
        </div>
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' type="password" id="repeat-password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
          {formik.errors.rePassword && formik.touched.rePassword?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span> 
          </div>:null  
          }
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" id="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5 " />
          {formik.errors.phone && formik.touched.phone?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.phone}</span> 
          </div>:null  
          }
        </div>
        <button type="submit" className={`${style.btn}  text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>
          {loading? <i className='fas fa-spinner fa-spin px-2'></i> : 'Register new account'}
        </button>
      </form>
    </>
  )
}
