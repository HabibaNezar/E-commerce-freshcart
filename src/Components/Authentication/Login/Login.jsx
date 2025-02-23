import React, {useContext, useState } from 'react'
import {useFormik} from 'formik'
import style from './Login.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import { userContext } from '../../../../Context/UserContext'


export default function Login() {
  let navigate = useNavigate()
  const[apiError , setApiError]= useState('');
  const[loading,setLoading]=useState(false);
  let{setUserLogin} = useContext(userContext)

  let validationSchema = yup.object().shape({
    email:yup.string().email('email invalid').required('email is required'),
    password:yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is invalid').required('password is required'),
  })

  function handleRegister(values) {
    console.log(values);
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then(
      (apiResp)=>
      {
        setLoading(false)
        console.log(apiResp)
        console.log(apiResp.data.token)
        localStorage.setItem('userToken' , apiResp.data.token)
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
      email:'',
      password:'',
    },
    onSubmit:handleRegister,
    validationSchema
  })

  
  
  
  
  return (
    <>
      <form className="min-h-screen md:mt-52 w-2/3 lg:w-1/3 mx-auto" onSubmit={formik.handleSubmit}>
        
        {apiError? 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>:null
        }
        
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
          <div className='flex justify-between'>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <span onClick={() => navigate('/forgot-password')} className='text-sm text-green-600 font-medium cursor-pointer'>Forget password?</span>
          </div>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-500 block w-full p-2.5" />
          {formik.errors.password && formik.touched.password?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span> 
          </div>:null  
          }
        </div>
        
        <div className='flex flex-row justify-between'>
          <button type="submit" className={`${style.btn}  text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>
            {loading? <i className='fas fa-spinner fa-spin px-2'></i> : 'Login'}
          </button>
          <p className='text-black pt-3'>Create new account <NavLink className={`pl-2 text-green-600 hover:text-green-700`} to={'/register'}>Register Now</NavLink></p>
        </div>
      </form>
    </>
  )
}
