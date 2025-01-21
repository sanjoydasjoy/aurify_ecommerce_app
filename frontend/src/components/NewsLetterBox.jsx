import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium py-6 text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
        Aurify is an clothing app offering the latest fashion collections with seamless shopping and a user-friendly interface
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox