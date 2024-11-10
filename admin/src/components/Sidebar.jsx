import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
    return (
        <div className='w-[18%] min-h-screen border-r-2 bg-gray-950'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded-1" to="/add">
                    <img className='w-5 h-5 bg-white' src={assets.add_icon} alt="" />
                    <p className='hidden md:block text-white'>Add Item</p>
                </NavLink>
                 
                <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded-1" to="/list">
                    <img className='w-5 h-5 bg-white' src={assets.order_icon} alt="" />
                    <p className='hidden md:block text-white'>List Item</p>
                </NavLink>

                <NavLink className="flex items-center gap-3 border border-gray-200 border-r-0 px-3 py-2 rounded-1" to="/orders">
                    <img className='w-5 h-5 bg-white' src={assets.order_icon} alt="" />
                    <p className='hidden md:block text-white'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
