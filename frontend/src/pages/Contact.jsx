import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from '../assets/assets'


const Contact = () => {
    return (
        <div>

            <div className='text-center text-2xl pt-10 border-t border-slate-200'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='my-10 elev-card p-5 sm:p-8 flex flex-col justify-center md:flex-row gap-10 mb-20'>
                <img className='w-full md:max-w-[480px] rounded-2xl' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-700'>Our Store</p>
                    <p className=' text-gray-500 leading-7'>Modina Market <br /> Main Point, Sylhet, Bangladesh</p>
                    <p className=' text-gray-500 leading-7'>Telephone: (415) 555-0132 <br /> Email: admin@aurify.com </p>
                    <p className='font-semibold text-xl text-gray-700'>Careers at Aurify</p>
                    <p className='text-gray-500'>Learn more about our teams and job openings</p>
                    <button className='btn-primary px-8 py-3 text-sm'>Explore jobs</button>
                </div>

            </div >

            <NewsLetterBox />

        </div >

    )
}

export default Contact;