import React from 'react'
import {assets} from '../assets/assets'

function Navbar({setToken}) {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img src={assets.logo2} alt="" className='w-[max(50px)]'/>
            <button onClick={() =>setToken("")} className='bg-gray-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar
