import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();


const ShopContextProvider = (props) =>{
   const currency = '₦'
   const delivery_fee =10
//    connecting product from the admin to the frontend
   const backendUrl = import.meta.env.VITE_BACKEND_URL
//    product from api
const [products, setProducts] = useState([])
//    this is for search icon
const [search, setSearch] = useState("")
// to display and to hide the search bar when true or false
const [showSearch,setShowSearch] = useState(false)
// aDD and save products from add to cart
const [cartItems, setCartItems] = useState({})
const navigate =useNavigate()

// login authentication
const [token,setToken] =useState("")


const addToCart = async(itemId, size) =>{
       
    //   logic for not selecting size
    if (!size) {
        toast.error("Select Product Size")
        return
        
    }


      let cartData = structuredClone(cartItems)
      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size]+=1
            
         }
         else{
            cartData[itemId][size] = 1
         }
      }
      else{
        cartData[itemId] ={}
        cartData[itemId][size] =1
      }
      setCartItems(cartData)
//  with this our product will be added to the datbase when we are logged in
      if(token){
        try {
            await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
      }
}


  const getCartCount =()=>{
    let totalCount =0
    for(const items in cartItems){
        for (const item in cartItems[items]) {
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            } catch (error) {
                
            }
            
        }
    }
    return totalCount

  }

//   for deleting

  const updateQuantity = async (itemId,size, quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] =quantity
    setCartItems(cartData)

    if (token){
        try {
            await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity}, {headers:{token}})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  }
// useEffect(()=>{
//    console.log(cartItems)
// }, [cartItems])

// To get cart amount
const getCartAmount = () =>{
    let totalAmount =0
    for(const items in cartItems){
        let itemInfo = products.find((product) => product._id ===items)
        for (const item in cartItems[items]) {
            try {
               if (cartItems[items][item] > 0){
                totalAmount +=itemInfo.price * cartItems[items][item]
               } 
            } catch (error) {
                
            }
            
        }
    } 
    return totalAmount 
}
// getting products using api
const getProductData = async () =>{
    try {
        const response = await axios.get(backendUrl + '/api/product/list')
        if(response.data.success){
            setProducts(response.data.products)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

//  when we reload the page the cart item remains in the cart

const getUserCart = async (token) =>{
   try {
         const response = await axios.post(backendUrl + '/api/cart/get', {},{headers:{token}})
         if (response.data.success) {
             setCartItems(response.data.cartData)
         }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
}
useEffect(()=>{
    getProductData()
}, [])

// 
useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
}, [])

    const value = {
        products , currency, delivery_fee,
        search,setSearch, showSearch, setShowSearch,
        cartItems,addToCart, setCartItems,getCartCount, updateQuantity,
        getCartAmount, navigate,backendUrl,setToken,token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider