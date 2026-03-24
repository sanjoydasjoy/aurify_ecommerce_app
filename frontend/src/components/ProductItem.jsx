import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {

        const {currency} = useContext(ShopContext)

  return (
    <Link className='text-gray-700 cursor-pointer block group reveal-up' to={`/product/${id}`}>
      <div className='surface-card overflow-hidden rounded-[22px] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl'>
        <div className='relative overflow-hidden'>
          <img className='group-hover:scale-110 transition duration-700 ease-out aspect-[3/4] object-cover w-full' src={image[0]} alt="" />
          <p className='absolute top-3 left-3 bg-[#111722] text-white text-[10px] px-3 py-1 rounded-full tracking-[0.14em] uppercase'>New</p>
        </div>
        <div className='p-4 sm:p-5'>
          <p className='product-name text-sm text-slate-800 line-clamp-2 min-h-[42px] leading-6'>{name}</p>
          <div className='mt-3 flex items-center justify-between'>
            <p className='product-price text-lg font-semibold text-[#17212f]'>{currency}{price}</p>
            <span className='product-tag text-[10px] uppercase tracking-[0.15em] text-[#876240]'>Aurify Edit</span>
          </div>
        </div>
        </div>
    </Link>
  )
}

export default ProductItem