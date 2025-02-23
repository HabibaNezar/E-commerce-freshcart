import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";


export default function CategorySlider() {
  
    let[category,setCategory] = useState(null)

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 1,
        cssEase: "linear"
      };

    function getAllCategory(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({data})=>{
            console.log(data.data )
            setCategory(data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getAllCategory()
    },[])
  
    return (
        <div className='container w-full h-32 mb-10 md:mb-36 mt-2'>
            <h3 className='text-3xl font-semibold pb-5'>Featured Categories</h3>
            <Slider {...settings}>
                {category?.map((src, index) => (
                <div key={index} className="h-full w-full p-1">
                    <img
                    className="w-full h-full object-cover object-center aspect-square cursor-pointer border-gray-200 hover:border-green-500 hover:shadow-xl transition-all ease-in delay-0 duration-150 border rounded-xl p-2"
                    src={src.image}
                    alt=""
                    />
                </div>
                ))}
            </Slider>
        </div>

 
  )
}
