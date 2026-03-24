import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

    return (
        <div className='admin-topbar flex items-center py-3 px-4 sm:px-6 justify-between'>
            <img src={assets.logo} alt="logo" className="w-32 sm:w-36 h-auto" />

            <div className='flex items-center gap-2 sm:gap-3'>
                <button onClick={() => setToken('')} className='admin-btn-solid text-xs sm:text-sm'>Logout</button>
            </div>
        </div>
    );
};

export default Navbar