import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [lastestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    // adding this }, [products]) is because when the function is executed productes will be updated


    return (
        <section className='my-16'>
            <div className='surface-card text-center py-8 px-5 sm:px-8 text-3xl mb-6'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='section-subtitle w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#5e6b80] leading-7'>
                    Signature drops inspired by contemporary tailoring, quiet luxury textures, and wearable confidence.
                </p>
            </div>
            {/*Rendering Products*/}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    lastestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </section>
    )
}

export default LatestCollection



