import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

    if (!(showSearch && visible)) return null

    return (
        <div className='mt-1 mb-4 reveal-up'>
            <div className='surface-card px-4 sm:px-6 py-4 sm:py-5'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div>
                        <p className='text-sm tracking-[0.16em] uppercase text-[#7c6855]'>Refine The Edit</p>
                        <p className='text-xs text-[#6f7c90] mt-1'>Search by product name, season pieces, or category keywords.</p>
                    </div>

                    <button onClick={() => setShowSearch(false)} className='btn-outline px-4 py-2 text-xs w-fit'>
                        Close Search
                    </button>
                </div>

                <div className='mt-4 flex items-center border border-[#d8c7b4] rounded-full bg-white px-4 py-2.5'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='flex-1 outline-none bg-transparent text-sm'
                        type='text'
                        placeholder='Try: linen shirt, winterwear, topwear'
                    />
                    <img className='w-4 opacity-70' src={assets.search_icon} alt='Search' />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
