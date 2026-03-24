import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-16 text-center text-xs sm:text-sm md:text-base text-gray-700'>
    <div className='elev-card p-6'>
      <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
      <p className='font-semibold text-[#17212f]'>Easy Exchange Policy</p>
      <p className='text-gray-500 mt-2'>Hassle-free replacements with a quick and transparent process.</p>
        </div>

    <div className='elev-card p-6'>
      <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
      <p className='font-semibold text-[#17212f]'>7 Days Return Policy</p>
      <p className='text-gray-500 mt-2'>Return within seven days with no stress and full support.</p>
        </div>

    <div className='elev-card p-6'>
      <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
      <p className='font-semibold text-[#17212f]'>Best Customer Support</p>
      <p className='text-gray-500 mt-2'>Real human support available whenever you need help.</p>
        </div>
    </div>
  )
}

export default OurPolicy