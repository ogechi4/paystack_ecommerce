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
import { MdClose } from "react-icons/md";
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
              <NavLink to='/' className="flex flex-col items-center gap-1"
              onClick={() => setShowMenu(false)}>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px]  hidden'/>
        </NavLink>

        <NavLink to='/collection' className="flex flex-col items-center gap-1" 
        onClick={() => setShowMenu(false)}>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px]  hidden'/>
        </NavLink>

        <NavLink to='/about' className="flex flex-col items-center gap-1"
        onClick={() => setShowMenu(false)}>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px]  hidden'/>
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1"
        onClick={() => setShowMenu(false)}>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px]  hidden'/>
        </NavLink>
              </ul>

              <div className='flex gap-2 justify-center'>
                
                <button className="bg-orange-500 px-6 py-3 md:hidden block rounded-[30px]">Sign In</button>
              </div>

              {/* Social Media Links */}
             
                <div className='flex justify-center'>
                  <h2 className="text-base font-titleFont mb-4 text-white">Connect with us on</h2>
                </div>
                <div className='flex justify-center'>
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
                <MdClose />
              </span>
            </div>
          </div>
        )}
        </div>
    )
}

export default Navbar
