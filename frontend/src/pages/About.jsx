import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from '../assets/assets'



const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t border-slate-200">
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className="my-10 elev-card p-5 sm:p-8 flex flex-col md:flex-row gap-10 md:gap-14">

                <img className="w-full md:max-w-[450px] rounded-2xl" src={assets.about_img} alt="" />
                <div className=" flex flex-col justify-center gap-5 md:w-2/4 text-gray-600 leading-7">
                    <p>Aurify blends modern design with everyday comfort to create a shopping experience that feels curated, confident, and effortless.</p>
                    <p>We focus on quality pieces, clean styling, and seamless order journeys from product discovery to delivery.</p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>To make premium fashion accessible through thoughtful product curation, dependable service, and elegant digital experiences.</p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-20">
                    <div className="elev-card px-8 md:px-10 py-8 sm:py-12 flex flex-col gap-5">
                        <b>Quality Assurance</b>
                        <p className="text-gray-600">Every listed item is selected for durability, fit quality, and visual consistency.</p>
                    </div>
                    <div className="elev-card px-8 md:px-10 py-8 sm:py-12 flex flex-col gap-5">
                        <b>Convenience</b>
                        <p className="text-gray-600">Smart filters, clear product pages, and easy checkout keep shopping smooth.</p>
                    </div>
                    <div className="elev-card px-8 md:px-10 py-8 sm:py-12 flex flex-col gap-5">
                        <b>Exceptional Customer Service</b>
                        <p className="text-gray-600" >Our support-first approach ensures your shopping experience stays stress-free.</p>
                    </div>
                </div>

                <NewsLetterBox />

            </div>

        </div>
    )
}

export default About;