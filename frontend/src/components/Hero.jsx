import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='surface-card overflow-hidden mt-2 section-shell reveal-up hero-wrap'>
            <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]'>
            <div className='hero-copy px-6 sm:px-9 lg:px-12 py-8 sm:py-10 bg-gradient-to-br from-[#f8efe2] via-[#fdf9f3] to-[#f0e6da] flex flex-col justify-center'>
                    <p className='hero-kicker text-xs sm:text-sm tracking-[0.22em] uppercase text-[#8e694a]'>Aurify Editorial Drop</p>
                    <h1 className='hero-title prata-regular text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-[#121a27] mt-3'>
                        Dress like your
                        <span className='hero-title-accent block text-[#9b6a42]'>best season</span>
                    </h1>
                    <p className='hero-sub text-sm sm:text-base text-[#55627a] mt-5 max-w-xl leading-7'>
                        Distinct silhouettes, polished textures, and elevated daily wear designed for modern, expressive lifestyles.
                    </p>

                    <div className='mt-6 flex flex-wrap items-center gap-3'>
                        <Link to='/collection' className='btn-primary px-7 py-3 text-sm'>Explore Collection</Link>
                        <Link to='/about' className='btn-outline px-7 py-3 text-sm'>Our Story</Link>
                    </div>

                    <div className='mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3'>
                        <div className='hero-stat glass-panel rounded-xl px-4 py-3'>
                            <p className='hero-stat-number text-2xl font-semibold text-[#17212f]'>120+</p>
                            <p className='hero-stat-label text-xs text-[#65728a]'>Curated Pieces</p>
                        </div>
                        <div className='hero-stat glass-panel rounded-xl px-4 py-3'>
                            <p className='hero-stat-number text-2xl font-semibold text-[#17212f]'>24/7</p>
                            <p className='hero-stat-label text-xs text-[#65728a]'>Support</p>
                        </div>
                        <div className='hero-stat glass-panel rounded-xl px-4 py-3 col-span-2 sm:col-span-1'>
                            <p className='hero-stat-number text-2xl font-semibold text-[#17212f]'>4.9</p>
                            <p className='hero-stat-label text-xs text-[#65728a]'>User Rating</p>
                        </div>
                    </div>
                </div>

                <div className='relative min-h-[300px] sm:min-h-[360px] lg:min-h-full float-glow'>
                    <img className='absolute inset-0 w-full h-full object-cover' src={assets.hero_img} alt='Aurify Hero' />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0f141c8c] via-[#0f141c33] to-transparent'></div>
                    <div className='hero-highlight absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4 text-white'>
                        <p className='hero-highlight-kicker text-xs uppercase tracking-[0.16em] text-[#c5d0df]'>Season Highlight</p>
                        <p className='hero-highlight-title mt-1 text-lg sm:text-xl font-semibold text-[#0f141c]'>Minimal tailoring with statement details</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
