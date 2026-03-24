import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()

    }
  return (
    <div className='elev-card text-center px-5 sm:px-10 py-10'>
      <p className='newsletter-heading text-2xl sm:text-3xl font-medium text-[#17212f]'>Subscribe now and get 20% off</p>
      <p className='newsletter-sub text-gray-500 mt-3 max-w-2xl mx-auto'>
      Join the Aurify list for style drops, limited collections, and early access releases.
        </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto mt-7 border border-gray-200 rounded-full p-2 bg-white'>
        <input className='w-full sm:flex-1 outline-none px-3 text-sm' type='email' placeholder='Enter your email' required/>
        <button className='btn-primary text-xs px-8 py-3' type='submit'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox