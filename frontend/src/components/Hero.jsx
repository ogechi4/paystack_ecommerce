// import React from 'react'
// import { assets } from '../assets/assets'

// function Hero() {
//     return (
//        <div className='flex flex-col sm:flex-row border border-gray-400'>
//           {/* hero left */}
//           <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//           <div className='text-[#414141]'>
//             <div className='flex items-center gap-2'>
//                 <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//                 <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>

//             </div>
//             <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Lastest Arrivals</h1>
//             <div className='flex items-center gap-2'>
//                 <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                 <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

//             </div>
//           </div>

//           </div>
//           {/* hero right */}
//           <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
//        </div>
//     )
// }

// export default Hero



import React from 'react';
import { assets } from '../assets/assets';
import Slider from 'react-slick'; // Import the react-slick library
import 'slick-carousel/slick/slick.css'; // Import CSS for the slider
import 'slick-carousel/slick/slick-theme.css'; // Import the theme CSS for the slider

function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendDots: (dots) => (
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                <ul style={{ margin: '0' }}>
                    {dots}
                </ul>
            </div>
        ),
    };

    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Hero Left */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* Hero Right with Slider */}
            <div className='w-full sm:w-1/2'>
                <Slider {...settings}>
                    <div>
                        <img className='w-full' src={assets.p_img10} alt="Slide 1" />
                    </div>
                    <div>
                        <img className='w-full' src={assets.p_img11} alt="Slide 2" />
                    </div>
                    <div>
                        <img className='w-full' src={assets.p_img12} alt="Slide 3" />
                    </div>
                    <div>
                        <img className='w-full' src={assets.p_img13} alt="Slide 4" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Hero;
