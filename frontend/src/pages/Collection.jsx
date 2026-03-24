import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from '../context/ShopContext'
import { assets } from "../assets/assets";
import ProductItem from '../components/ProductItem'
import Title from "../components/Title";


const Collection = () => {

    const { products, search, showSearch, backendUrl } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [catagory, setCatagory] = useState([])
    const [subCatagory, setSubCatagory] = useState([])
    const [sortType, setSortType] = useState('relevant')
    const [aiQuery, setAiQuery] = useState('')
    const [aiLoading, setAiLoading] = useState(false)
    const [aiSummary, setAiSummary] = useState('')
    const [aiSource, setAiSource] = useState('')

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

    const handleAiSearch = async (e) => {
        e.preventDefault()
        if (!aiQuery.trim()) {
            toast.error('Enter what you want to find first')
            return
        }

        try {
            setAiLoading(true)
            const response = await axios.post(backendUrl + '/api/ai/search', {
                query: aiQuery,
            })

            if (!response.data.success) {
                toast.error(response.data.message || 'AI search failed')
                return
            }

            setFilterProducts(response.data.products || [])
            setAiSummary(response.data.summary || '')
            setAiSource(response.data.source || 'fallback')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setAiLoading(false)
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
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 pt-10 border-t border-slate-200">
            {/* Filter Options */}
            <div className="min-w-60 elev-card p-4 h-fit sm:sticky sm:top-28">
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-lg font-semibold tracking-wide flex items-center cursor-pointer gap-2">FILTERS</p>
                <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                {/* Catagory Filter */}
                <div className={`border border-gray-200 rounded-xl pl-5 py-4 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-slate-700">CATEGORIES</p>
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


                <div className={`border border-gray-200 rounded-xl pl-5 py-4 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-slate-700">TYPE</p>
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
                <div className="elev-card px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <Title text1={'All'} text2={'COLLECTIONS'} />
                    {/* Product Sort */}
                    <select onChange={(e)=>setSortType(e.target.value)} className="border border-gray-300 rounded-full text-sm px-4 py-2 bg-white">
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low-High </option>
                        <option value="high-low">Sort by: High-Low</option>
                    </select>
                </div>

                <form onSubmit={handleAiSearch} className="elev-card p-4 sm:p-5 mb-6">
                    <p className="text-xs tracking-[0.12em] font-semibold text-slate-700">AI PRODUCT SEARCH</p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-3">
                        <input
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            placeholder="Try: premium black office shirt under 2000"
                            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        />
                        <button
                            type="submit"
                            disabled={aiLoading}
                            className="rounded-xl px-5 py-3 text-sm font-semibold bg-slate-900 text-white disabled:opacity-60"
                        >
                            {aiLoading ? 'Searching...' : 'Find with AI'}
                        </button>
                    </div>

                    {(aiSummary || aiSource) && (
                        <p className="mt-3 text-sm text-slate-600">
                            {aiSummary}
                            {aiSource && ` (${aiSource === 'ai' ? 'Smart AI mode' : 'Fallback mode'})`}
                        </p>
                    )}
                </form>

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