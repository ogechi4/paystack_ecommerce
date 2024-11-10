import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Navbar() {
    const [visible, setVisible] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
// search functionality
    const {setShowSearch, getCartCount, navigate, token, setToken,setCartItems} = useContext(ShopContext)

    const logout =()=>{
        navigate("/login")
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
      
    }
    return (
        <div className='flex items-center justify-between py-5 px-6 font-medium bg-[#131921] text-white'>

      <Link to='/'>
      <img src={assets.logo2} alt="logo" className='w-12 ' />
      </Link>

      <ul className='hidden md:flex gap-5 text-sm text-gray700'>
        <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

        <div className='flex items-center gap-6'>
            <span onClick={()=>setShowSearch(true)}  className='w-5 cursor-pointer '><SearchIcon/> </span>
               {/* Dropdown */}
               
            <div className='group relative'>
                <p onClick={() =>token ? null : navigate('/login')}  className='w-5 cursor-pointer' > <AccountCircleIcon /></p>
                {/* <img onClick={() =>token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />  */}
                {/* dropdown menu */}
                 {
                    token && <div className='group-hover:block hidden  z-50 absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                   </div>
                 }
            </div>

            <Link to='/cart' className='relative'>
            <span   className='w-5 cursor-pointer' > <ShoppingCartIcon /></span>
            {/* <img src={assets.cart_icon} className='w-5 min-5' alt="" /> */}
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{getCartCount()}</p>
            
            </Link>
            <span
            onClick={() => setShowMenu(!showMenu)}
            className="text-xl lgl:hidden md:hidden bg-black w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
          >
            <MenuIcon />
          </span>
        </div>
        {/* Sidebar Menu */}

        {showMenu && (
          <div className="w-[80%] h-screen overflow-scroll z-50 absolute top-0 left-0 bg-gray-900 p-4 scrollbar-hide">
            <div className="flex flex-col gap-8 py-2 relative">
              <div className="text-2xl font-bold text-orange-500 flex">
                <img src={assets.logo2} width={28} alt="logo" className="pr-1" />
                {/* <span>OLANTEK</span> */}
              </div>

              {/* Mobile Navigation Links */}
              <ul className="flex flex-col gap-4">
                <li className="relative group text-white">
                  <a href="#" className="hover:text-orange-500">Products</a>

                  {/* Dropdown Menu */}
                  <ul className="absolute hidden group-hover:block bg-gray-900 shadow-lg rounded-lg p-4 ml-[80px] space-y-4 w-48 z-10">
                    {/* <li>
                      <a href="/products/1" className="hover:text-orange-500 block">Product 1</a>
                    </li> */}
                    <li>
                      <a href="/products/2" className="hover:text-orange-500 block">StorePro desktop</a>
                    </li>
                    <li>
                      <a href="/products/3" className="hover:text-orange-500 block">StorePro web</a>
                    </li>
                  </ul>
                </li>
                <li className="text-base font-normal text-white tracking-wide cursor-pointer hover:text-orange-500 duration-300">
                  <a href="#about">About</a>
                </li>
                <li className="text-base font-normal text-white tracking-wide cursor-pointer hover:text-orange-500 duration-300">
                  <a href="#services">Blog</a>
                </li>
                <li className="text-base font-normal text-white tracking-wide cursor-pointer hover:text-orange-500 duration-300">
                  <a href="#contact">Contact</a>
                </li>
              </ul>

              <div className='flex gap-2'>
                
                <button className="bg-orange-200 px-6 py-3 md:hidden block rounded-[30px]">Sign In</button>
              </div>

              {/* Social Media Links */}
              <div>
                <div className='flex justify-between'>
                  <h2 className="text-base font-titleFont mb-4 text-white">Connect with us on</h2>
                </div>
                <span className="mediaIcon"><FaFacebookF /></span>
                <span className="mediaIcon"><FaTwitter /></span>
                <span className="mediaIcon"><FaLinkedinIn /></span>
                <span className="mediaIcon"><FaInstagram /></span>
              </div>

              {/* Close Mobile Menu Button */}
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-500 duration-300 text-2xl cursor-pointer"
              >
                {/* <MdClose /> */}
              </span>
            </div>
          </div>
        )}
        </div>
    )
}

export default Navbar
