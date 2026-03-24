import React from 'react'
import { assets } from '../assets/assets'


const Footer = () => {
  return (
    <div className='mt-28 mb-4'>
        <div className='rounded-[24px] overflow-hidden border border-[#202938]'>
            <div className='bg-gradient-to-br from-[#0f141c] via-[#182132] to-[#1f2a3e] text-[#f5efe7] p-8 sm:p-10 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 text-sm'>
            <div>
                <div className='footer-brand mb-5 w-fit'>
                    <img src={assets.logo} className='w-32 footer-logo-image' alt="" />
                </div>
                <p className='w-full md:w-2/3 text-[#d9cbbd] leading-7'>
                Aurify blends elevated style with effortless commerce, delivering a confident and premium fashion journey.
                </p>
            </div>
            <div>
                <p className='text-xs font-semibold mb-4 tracking-[0.18em] text-[#f3dfc7]'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-[#d9cbbd]'>
                   <li>Home</li>
                   <li>About</li>
                   <li>Delivery</li>
                   <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xs font-semibold mb-4 tracking-[0.18em] text-[#f3dfc7]'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-[#d9cbbd]'>
                   <li>+1-465-553-363</li>
                   <li>contact@aurify.com</li>
                </ul>
            </div>
            </div>
        </div>
        <div>
            <p className='py-5 text-xs sm:text-sm text-center text-[#6f7c90]'>Copyright 2024@ aurify.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer