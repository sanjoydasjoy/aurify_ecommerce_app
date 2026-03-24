import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import AIStylist from "../components/AIStylist";

const Home = () =>{
    return(
        <div className='space-y-8 sm:space-y-10'>
            <Hero />
            <div className='section-shell'>
                <LatestCollection />
            </div>
            <div className='section-shell'>
                <BestSeller />
            </div>
            <div className='section-shell'>
                <AIStylist />
            </div>
            <div className='section-shell'>
                <OurPolicy />
            </div>
            <NewsLetterBox />
        </div>
    )
}

export default Home;