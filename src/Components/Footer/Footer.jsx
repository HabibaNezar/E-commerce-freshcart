import React from 'react'

export default function Footer() {
  return (
    <>
      <div className='mt-20 bg-gray-100 py-10'>
        <div className="container mx-auto">
          <div className="section1 grid md:grid-cols-2 grid-cols-1 gap-0">
            <div className=" w-full">
              <p className="font-bold text-gray-700 mb-2">Categories</p>
              <div className='flex gap-10'>
                <div className="leading-7">
                  <p>Vegetables & Fruits</p>
                  <p>Breakfast & instant food</p>
                  <p>Bakery & Biscuits</p>
                  <p>Atta, rice & dal</p>
                  <p>Sauces & spreads</p>
                  <p>Organic & gourmet</p>
                  <p>Baby care</p>
                  <p>Cleaning essentials</p>
                  <p>Personal care</p>
                </div>
                <div className="leading-7">
                  <p>Dairy, bread & eggs</p>
                  <p>Cold drinks & juices</p>
                  <p>Tea, coffee & drinks</p>
                  <p>Masala, oil & more</p>
                  <p>Chicken, meat & fish</p>
                  <p>Paan corner</p>
                  <p>Pharma & wellness</p>
                  <p>Home & office</p>
                  <p>Pet care</p>
                </div>
              </div>
            </div>
            <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-5">
              <div className="w-full max-w-[200px] leading-7">
                <p className="font-bold text-gray-700 mb-2">Get to know us</p>
                <p>Company</p>
                <p>About</p>
                <p>Blog</p>
                <p>Help Center</p>
                <p>Our Value</p>
              </div>
              <div className="w-full max-w-[200px] leading-7">
                <p className="font-bold text-gray-700 mb-2">For Consumers</p>
                <p>Payments</p>
                <p>Shipping</p>
                <p>Product Returns</p>
                <p>FAQ</p>
                <p>Shop Checkout</p>
              </div>
              <div className="w-full max-w-[200px] leading-7">
                <p className="font-bold text-gray-700 mb-2">Become a Shopper</p>
                <p>Shopper Opportunities</p>
                <p>Become a Shopper</p>
                <p>Earnings</p>
                <p>Ideas & Guides</p>
                <p>New Retailers</p>
              </div>
              <div className="w-full max-w-[200px] leading-7">
                <p className="font-bold text-gray-700 mb-2">Freshcart programs</p>
                <p>Freshcart programs</p>
                <p>Gift Cards</p>
                <p>Promos & Coupons</p>
                <p>Freshcart Ads</p>
                <p>Careers</p>
              </div>
            </div>
          </div>
          <hr className=' my-5' />
          <div className="section2 flex flex-row justify-between">
            <div>
              <p>© 2022 - 2025 FreshCart eCommerce HTML Template. All rights reserved. Powered by <span className='text-green-500'>Codescandy</span> .</p>
            </div>
            <div className='flex flex-row gap-4 items-baseline'>
                <p>follow us</p>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
