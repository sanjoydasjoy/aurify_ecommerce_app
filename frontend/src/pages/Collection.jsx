import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext'
import { assets } from "../assets/assets";
import ProductItem from '../components/ProductItem'
import Title from "../components/Title";


const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [catagory, setCatagory] = useState([])
    const [subCatagory, setSubCatagory] = useState([])
    const [sortType, setSortType] = useState('relevant')

    const toggleCatagory = (e) => {
        if (catagory.includes(e.target.value)) {
            setCatagory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCatagory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCatagory = (e) => {
        if (subCatagory.includes(e.target.value)) {
            setSubCatagory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCatagory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if(showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        //console.log("Selected categories:", catagory);

        if(catagory.length > 0){
            productsCopy = productsCopy.filter(item => catagory.includes(item.category))
        }

        //console.log("Filtered products:", productsCopy);

        if(subCatagory.length > 0){
            productsCopy = productsCopy.filter(item => subCatagory.includes(item.subCategory))
        }

        setFilterProducts(productsCopy);
    };

    const sortProducts = () => {
        let fpCopy = filterProducts.slice()

        switch(sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
                break;

                case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
                break;

                default:
                applyFilter()
                break
        }
    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    // useEffect(() => {
    //     setFilterProducts(products) // since we added this logic in applyFilter function. when it will render for the first time
    // }, [])

    useEffect(() => {
        applyFilter()
    }, [catagory, subCatagory, search, showSearch, products])

    // adding this }, [products]) is because when the function is executed productes will be updated


    // useEffect(() => {
    //    console.log(catagory);
    // }, [catagory])
    // useEffect(() => {
    //     console.log(subCatagory);
    //  }, [subCatagory])

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS</p>
                <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                {/* Catagory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATAGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCatagory} /> Men
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCatagory} /> Women
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCatagory} /> Kids
                        </p>
                    </div>

                </div>

                {/* Subcatagory Filter */}


                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCatagory} /> Topwear
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCatagory} /> Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCatagory} /> Winterwear
                        </p>
                    </div>

                </div>

            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'All'} text2={'COLLECTIONS'} />
                    {/* Product Sort */}
                    <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low-High </option>
                        <option value="high-low">Sort by: High-Low</option>
                    </select>
                </div>
                {/* Map Products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection;