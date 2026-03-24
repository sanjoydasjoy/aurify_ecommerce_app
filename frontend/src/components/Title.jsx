import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-3 items-center mb-3'>
        <p className='title-kicker text-xs sm:text-sm tracking-[0.2em] uppercase text-[#7f6b56]'>{text1} <span className='title-main prata-regular text-[#1a2433] text-lg sm:text-xl normal-case tracking-normal font-semibold ml-1'>{text2}</span></p>
        <p className='title-rule w-10 sm:w-16 h-[2px] bg-gradient-to-r from-[#8f5d38] to-[#d7b08f]'></p>
    </div>
  )
}

export default Title