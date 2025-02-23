import React from 'react'
import Slider from "react-slick";
import img1 from '../../../assets/img-1.jpg'
import img2 from '../../../assets/img-2.jpg'
import img3 from '../../../assets/img-3.jpg'
import img4 from '../../../assets/img-4.jpg'

export default function MainSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"

      };

  return (
    <>
        <div className="container flex md:mt-20">
            

            {/* العمود الثاني للسلايدر */}
            <div className="w-3/4">
                <Slider className="" {...settings}>
                    <img className="h-[400px] w-full object-cover" src={img3} alt="" />
                    <img className="h-[400px] w-full object-cover" src={img4} alt="" />
                </Slider>
            </div>
            {/* العمود الأول للصور الثابتة */}
            <div className="w-1/4 flex flex-col ">
                <img className="h-[200px] w-full object-cover" src={img1} alt="" />
                <img className="h-[200px] w-full object-cover" src={img2} alt="" />
            </div>
        </div>

    </>
  )
}
