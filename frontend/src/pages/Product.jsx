import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

    const { productId } = useParams()
    //console.log(productId);
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setProductdata] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        const isAdded = await addToCart(productData._id, size)
        setTimeout(() => {
            setIsAdding(false)
        }, isAdded ? 800 : 300)
    }

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductdata(item)
                //console.log(item);
                setImage(item.image[0])
                return null
            }
        })
    }
    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className="border-t border-slate-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* Product Data */}
            <div className="elev-card p-4 sm:p-7 flex gap-8 sm:gap-12 flex-col sm:flex-row">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-2 flex-shrink-0 cursor-pointer rounded-lg border border-gray-200" alt="" />
                            ))
                        }
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto rounded-xl" src={image} alt="" />


                    </div>
                </div>
                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="font-semibold text-2xl mt-2 text-[#17212f]">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_icon} alt="" className="w-3.5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-semibold text-[#17212f]">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-3/4">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p className="text-sm font-semibold tracking-wide">SELECT SIZE</p>
                        <div className="flex gap-2 flex-wrap">
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`size-pill border py-2 px-4 rounded-full transition ${item === size ? 'size-pill-active' : 'border-gray-300'}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleAddToCart} className={`btn-primary px-8 py-3 text-sm transition ${isAdding ? 'scale-[0.98] opacity-90' : ''}`}>
                        {isAdding ? 'ADDING...' : 'ADD TO CART'}
                    </button>
                    <hr className="mt-8 sm:w-4/5" />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original Product</p>
                        <p> Cash on delivery is available on this product</p>
                        <p>Easy return and exchange policy within 7 days</p>

                    </div>
                </div>
            </div>

            {/* Description & review section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border border-gray-200 bg-white px-5 py-3 text-sm rounded-tl-xl">Description</b>
                    <p className="border border-gray-200 bg-slate-50 px-5 py-3 text-sm rounded-tr-xl">Reviews (122)</p>

                </div>

                <div className="flex flex-col gap-4 border border-gray-200 bg-white px-6 py-5 text-sm text-gray-500 rounded-b-xl">
                    <p>Discover trendsetting styles with Aurify, where fashion meets convenience.</p>
                    <p>Aurify is an clothing app offering the latest fashion collections with seamless shopping and a user-friendly interface.</p>
                </div>
            </div>

            {/* Display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
    ) : <div className="opacity-0"> </div>

}

export default Product;