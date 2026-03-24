import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'

const navItems = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
]

const SunIcon = () => (
    <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <circle cx='12' cy='12' r='4.2'></circle>
        <path d='M12 2.5v2.3M12 19.2v2.3M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6'></path>
    </svg>
)

const MoonIcon = () => (
    <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        <path d='M20.5 14.7A8.6 8.6 0 0 1 9.3 3.5a8.8 8.8 0 1 0 11.2 11.2z'></path>
    </svg>
)

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        setShowProfileMenu(false)
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('aurify-theme')
        const darkEnabled = savedTheme === 'dark'
        setIsDarkMode(darkEnabled)
        document.body.classList.toggle('theme-dark', darkEnabled)
    }, [])

    const toggleTheme = () => {
        const nextValue = !isDarkMode
        setIsDarkMode(nextValue)
        document.body.classList.toggle('theme-dark', nextValue)
        localStorage.setItem('aurify-theme', nextValue ? 'dark' : 'light')
    }

    return (
        <header className='sticky top-0 z-50 py-2'>
            <div className='glass-panel rounded-2xl overflow-visible'>
                <div className='bg-[#111722] text-[#f2e7d8] text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 flex items-center justify-between tracking-[0.14em] uppercase'>
                    <p>Elevated everyday fashion</p>
                    <p className='hidden sm:block'>Free shipping over $120</p>
                </div>

                <div className='px-4 sm:px-6 py-3 flex items-center justify-between'>
                    <Link to='/' className='brand-mark'>
                        <img src={assets.logo} className='w-28 sm:w-34 md:w-36 brand-logo-image' alt='Aurify Logo' />
                    </Link>

                    <nav className='hidden md:flex items-center gap-1'>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `nav-link px-4 py-2 text-sm rounded-full transition ${isActive ? 'bg-white/80 font-semibold' : 'hover:bg-white/60'}`}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className='flex items-center gap-3 sm:gap-4'>
                        <button onClick={() => setShowSearch(true)} className='btn-outline w-9 h-9 grid place-items-center'>
                            <img src={assets.search_icon} className='w-4' alt='Search' />
                        </button>

                        <button onClick={toggleTheme} className='btn-outline w-9 h-9 grid place-items-center' aria-label='Toggle theme'>
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>

                        <div className='relative'>
                            <img
                                onClick={() => {
                                    if (!token) {
                                        navigate('/login')
                                    } else {
                                        setShowProfileMenu((prev) => !prev)
                                    }
                                }}
                                className='w-9 h-9 rounded-full border border-[#ddc9b2] bg-white p-1.5 cursor-pointer'
                                src={assets.profile_icon}
                                alt='Profile'
                            />

                            {token && showProfileMenu && (
                                <div className='absolute right-0 pt-3 z-50'>
                                    <div className='surface-card w-40 py-3 px-4 text-sm text-[#4a5568]'>
                                        <p onClick={() => { setShowProfileMenu(false); navigate('/profile') }} className='cursor-pointer hover:text-black'>My Profile</p>
                                        <p onClick={() => { setShowProfileMenu(false); navigate('/orders') }} className='cursor-pointer hover:text-black mt-2'>Orders</p>
                                        <p onClick={logout} className='cursor-pointer hover:text-black mt-2'>Logout</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to='/cart' className='relative'>
                            <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
                            <p className='absolute right-[-8px] bottom-[-8px] w-5 text-center leading-5 bg-[#111722] text-white aspect-square rounded-full text-[9px]'>
                                {getCartCount()}
                            </p>
                        </Link>

                        <button onClick={() => { setShowProfileMenu(false); setVisible(true) }} className='md:hidden'>
                            <img src={assets.menu_icon} className='w-5 cursor-pointer' alt='Open Menu' />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 right-0 bottom-0 z-50 transition-all duration-300 ${visible ? 'w-full opacity-100 pointer-events-auto' : 'w-full opacity-0 pointer-events-none'}`}>
                <div className='h-full w-full bg-[#0f141ce8] backdrop-blur-sm'>
                    <div className={`absolute top-0 right-0 h-full w-[82%] max-w-[340px] bg-[#fcf7f0] p-5 transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-3 pb-4 border-b border-[#e8ddd0] cursor-pointer'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back' />
                            <p className='text-sm uppercase tracking-[0.14em]'>Back</p>
                        </div>

                        <div className='mt-6 flex flex-col gap-2'>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    onClick={() => setVisible(false)}
                                    className='py-3 px-3 rounded-xl text-[#2f3c52] hover:bg-white'
                                    to={item.to}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
