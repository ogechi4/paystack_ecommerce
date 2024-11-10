import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaReact } from "react-icons/fa";

function Contact() {
    return (
        <div>
              <div className='text-center text-2xl pt-10 border-t'>
            <Title text1={'CONTACT'} text2={'US'}/>

        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
              <div className='flex flex-col justify-center items-start gap-6'>
                 <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                 <p className='text-gray-500'>20 Ayo-Alabi Okera  <br />Ogba, Lagos.</p>
                 <p className='text-gray-500'>Tel: (+234) 8124783577 <br />Email: princewill@gmail.com</p>
                 <div className="flex gap-4">
            <span className="mediaIcon">
            <FaInstagram />
            </span>
            <span className="mediaIcon">
             <FaFacebookF />
            </span>
            <span className="mediaIcon">
              <FaWhatsapp />
            </span>
          </div>
              </div>
        </div>
        <NewsletterBox />
        </div>
        
    )
}

export default Contact
