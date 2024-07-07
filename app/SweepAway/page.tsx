import React from 'react'
import style from './style.module.css'
const page = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <h1 className={`text-7xl font-bold text-green-600 ${style.sharkTxt}`}>
        文本扫光
      </h1>
    </div>
  )
}

export default page
