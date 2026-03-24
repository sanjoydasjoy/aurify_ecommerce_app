import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <aside className='admin-sidebar w-[250px] hidden md:block'>
            <div className='flex flex-col gap-2 p-4 text-[15px]'>
                <p className='text-[11px] uppercase tracking-[0.14em] text-slate-500 px-3'>Navigation</p>

                <NavLink className='admin-nav-link flex items-center gap-3 px-3 py-2 rounded-xl' to="/add">
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>

                <NavLink className='admin-nav-link flex items-center gap-3 px-3 py-2 rounded-xl' to="/list">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>

                <NavLink className='admin-nav-link flex items-center gap-3 px-3 py-2 rounded-xl' to="/orders">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar