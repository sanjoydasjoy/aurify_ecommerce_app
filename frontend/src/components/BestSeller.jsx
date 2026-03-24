import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSelller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller))
        setBestSelller(bestProduct.slice(0, 5))
    }, [products])

    // adding this }, [products]) is because when the function is executed productes will be updated
    return (
        <section className='my-16'>
            <div className='best-seller-banner text-center text-3xl py-8 px-5 sm:px-8 mb-6 rounded-[22px] border border-[#dbc8b2] bg-gradient-to-r from-[#f6ebdd] to-[#f1e2d1]'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='section-subtitle w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base leading-7'>
                Our most-loved pieces, selected for fit, premium finishing, and all-day elegance.
                </p>
            </div>
            {/*Rendering Products*/}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </section>
    )
}

export default BestSeller