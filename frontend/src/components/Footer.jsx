import React from 'react'
import FooterList from './FooterList'
import { middleList } from '../constant'
import { assets } from '../assets/assets';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <>
        <div className='w-full bg-green-500 text-white'>
            <div className='w-full bg-slate-950 py-1 mt-[50px]'>
                {/* this first div is for the border */}
             <div className='w-full border-b-[1px] border-gray-500 py-10 max-w-5xl mx-auto'>
                <div className='max-w-5xl mx-auto text-gray-300 grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-2'>
                <div className='flex flex-col ml-14'>
                <div className="text-2xl font-bold text-orange-500 flex ">
                <img src={assets.logo2} width={30} alt="" className='pr-1 h-[30px]' />
                <span>OLANTEK</span> 
                </div>
                <p>105 Ndiechi Onuebonyi Igbeagu Izzi <br />
                 Ebonyi state Nigeria</p>
                <p className='mt-8'>Phone: +234 814 917 8353</p>
                <p>Email: support@rolantekgroup.com </p>
                </div>
                
                  
                  <div className=' grid grid-cols-1 ml-14 mt-5 lgl:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2'>
                       {/* <div className='bg-red-500'>  */}
                         {middleList.map((item) => (
                        <FooterList
                            key={item._id}
                            title={item.title}
                            listItem={item.listItem}
                        />
                        ))}</div>
                     
                  </div>
                </div>
               {/* second footer */}
                <div className='max-w-5xl mx-auto text-gray-300 flex-col mdl:flex md:flex-row justify-between mt-4'>
                  <div className='items-center justify-center flex'>
                    <p>CopyRights@2024 Rolantek. All Rights Reserved</p>
                  </div>
                  <div className='flex justify-center'>
                  <a href="https://www.facebook.com/retailpolaris" target="_blank" rel="noopener noreferrer" className="mediaIcon">
                   <FaFacebookF />
                    </a>
                    <a href="https://www.x.com/retailpolaris" target="_blank" rel="noopener noreferrer" className="mediaIcon">
                   <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com/company/retail-polaris"  target="_blank" rel="noopener noreferrer" className="mediaIcon">
                   <FaLinkedinIn />
                    </a>
                    <a href="https://instagram.com/retailpolaris" target="_blank" rel="noopener noreferrer" className="mediaIcon">
                   <FaInstagram />
                    </a>
                  </div>
                </div>

               </div>
            </div>
             
         
        
        </>
    )
}

export default Footer
