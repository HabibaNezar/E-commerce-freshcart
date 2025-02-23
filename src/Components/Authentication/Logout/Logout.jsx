import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../../../Context/CartContext'

export default function Logout() {
  let { setCart } = useContext(CartContext)

  useEffect(() => {
    setCart(null) // 🔹 تصفير السلة عند تسجيل الخروج
  }, []) // 🔹 تشغيل التأثير مرة واحدة عند تحميل الكومبوننت

  return (
    <div>Logging out...</div>
  )
}
