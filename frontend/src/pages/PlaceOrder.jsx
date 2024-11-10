import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast} from 'react-toastify'


function PlaceOrder() {

    const [method, setMethod] =useState('cod')
    const {navigate, backendUrl, token, cartItems, setCartItems,getCartAmount, delivery_fee,products} = useContext(ShopContext)

    const [formData, setformData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        phone:''
    })

    const onChangeHandler = (e) =>{
        const name =e.target.name
        const value =e.target.value

        setformData(data => ({...data,[name]:value}))
    }
    
    const onsubmitHandler = async(e)=>{
        e.preventDefault()
        try {
            // this is to get the product details from the cart
            let orderItems = []

            for(const items in cartItems){
                for (const item in cartItems[items]){
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product =>product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item] 
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            // get the data and add them to orderData
             let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
             }

            //  use switch case to select payment type
            switch (method) {
                // API CALL FOR COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                   console.log(response.data)
                    if (response.data.success){
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                    case 'paystack': 
                       const responsePayStack = await axios.post(backendUrl + '/api/order/paystack',orderData,{headers:{token}})
                       console.log(responsePayStack.data)
                       if (responsePayStack.data.success) {
                          const {session_url} = responsePayStack.data
                          window.location.href = session_url
                       }else{
                        toast.error(responsePayStack.data.message)
                       }
                       
                default:
                    break;
            }
            // console.log(orderItems)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    return (
        <form onSubmit={onsubmitHandler} className='flex flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left side */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-5'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'}/>

                </div>
                <div className='flex gap-3'>
                  <input required type="text" 
                  onChange={onChangeHandler}
                  name='firstName'
                  value={formData.firstName}
                  placeholder='first name' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                   <input required type="text" 
                    onChange={onChangeHandler}
                    name='lastName'
                    value={formData.lastName}
                  placeholder='lastname name' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                </div>
                <input required type="email" 
                 onChange={onChangeHandler}
                 name='email'
                 value={formData.email}
                  placeholder='Email address' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                   
                   <input required type="text" 
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                  placeholder='Street' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

         <div className='flex gap-3'>
                 <input required type="text" 
                  onChange={onChangeHandler}
                  name='city'
                  value={formData.city}
                  placeholder='City' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

                 <input required type="text"
                  onChange={onChangeHandler}
                  name='state'
                  value={formData.state} 
                  placeholder='State' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                 </div>

                 <input required type="number" 
                  onChange={onChangeHandler}
                  name='phone'
                  value={formData.phone}
                  placeholder='Phone' 
                  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        
                   
            </div>

            {/* Right side */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />

                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'}/>
                    {/* payment method selection */}
                    <div onClick={() => setMethod('paystack') } className='flex gap-3 flex-col lg:flex-row'>
                        <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                          <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='paystack'? 'bg-green-400':''}`}></p>
                          <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        </div>

                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                          <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'? 'bg-green-400':''}`}></p>
                         <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>

                </div>

            </div>

        </form>
    )
}

export default PlaceOrder



// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { PaystackButton } from 'react-paystack'; // Import PaystackButton

// const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;



// function PlaceOrder() {
//   const [method, setMethod] = useState('cod');
//   const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

//   const [formData, setformData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     phone: ''
//   });

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setformData((data) => ({ ...data, [name]: value }));
//   };

//   const prepareOrderItems = () => {
//     let orderItems = [];
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         if (cartItems[items][item] > 0) {
//           const itemInfo = structuredClone(products.find((product) => product._id === items));
//           if (itemInfo) {
//             itemInfo.size = item;
//             itemInfo.quantity = cartItems[items][item];
//             orderItems.push(itemInfo);
//           }
//         }
//       }
//     }
//     return orderItems;
//   };

//   const onsubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const orderItems = prepareOrderItems();
//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee
//       };

//       // Switch case for payment methods
//       switch (method) {
//         // API CALL FOR COD
//         case 'cod':
//           const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
//           if (response.data.success) {
//             setCartItems({});
//             navigate('/orders');
//           } else {
//             toast.error(response.data.message);
//           }
//           break;

//         case 'paystack': {
//           // Paystack payment will be handled in the PaystackButton
//           break;
//         }

//         default:
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const handlePaystackSuccess = (reference) => {
//     // Handle Paystack payment success and verify the transaction on the backend
//     axios.post(`${backendUrl}/api/order/verify`, { reference }, { headers: { token } })
//       .then((response) => {
//         if (response.data.success) {
//           setCartItems({});
//           navigate('/orders');
//         } else {
//           toast.error('Payment verification failed.');
//         }
//       })
//       .catch((error) => {
//         console.error("Error verifying Paystack payment:", error);
//         toast.error('An error occurred during payment verification.');
//       });
//   };

//   const handlePaystackClose = () => {
//     toast.info('Payment closed');
//   };

//   const paystackProps = {
//     email: formData.email,
//     amount: (getCartAmount() + delivery_fee) * 100, // Paystack accepts amount in kobo
//     publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Accessing Paystack public key from .env
//     text: "Pay with Paystack",
//     onSuccess: handlePaystackSuccess,
//     onClose: handlePaystackClose,
//   };
  

//   return (
//     <form onSubmit={onsubmitHandler} className='flex flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//       {/* Left side */}
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//         <div className='text-xl sm:text-2xl my-5'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className='flex gap-3'>
//           <input
//             required
//             type="text"
//             onChange={onChangeHandler}
//             name='firstName'
//             value={formData.firstName}
//             placeholder='First name'
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//           />
//           <input
//             required
//             type="text"
//             onChange={onChangeHandler}
//             name='lastName'
//             value={formData.lastName}
//             placeholder='Last name'
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//           />
//         </div>
//         <input
//           required
//           type="email"
//           onChange={onChangeHandler}
//           name='email'
//           value={formData.email}
//           placeholder='Email address'
//           className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//         />
//         <input
//           required
//           type="text"
//           onChange={onChangeHandler}
//           name='street'
//           value={formData.street}
//           placeholder='Street'
//           className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//         />
//         <div className='flex gap-3'>
//           <input
//             required
//             type="text"
//             onChange={onChangeHandler}
//             name='city'
//             value={formData.city}
//             placeholder='City'
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//           />
//           <input
//             required
//             type="text"
//             onChange={onChangeHandler}
//             name='state'
//             value={formData.state}
//             placeholder='State'
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//           />
//         </div>
//         <input
//           required
//           type="number"
//           onChange={onChangeHandler}
//           name='phone'
//           value={formData.phone}
//           placeholder='Phone'
//           className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//         />
//       </div>

//       {/* Right side */}
//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <CartTotal />
//         </div>
//         <div className='mt-12'>
//           <Title text1={'PAYMENT'} text2={'METHOD'} />
//           {/* Payment method selection */}
//           <div className='flex gap-3 flex-col lg:flex-row'>
//             <div
//               onClick={() => setMethod('paystack')}
//               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
//             >
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paystack' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
//             </div>
//             <div
//               onClick={() => setMethod('cod')}
//               className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
//             >
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </div>
//           </div>

//           <div className='w-full text-end mt-8'>
//             {method === 'paystack' ? (
//               <PaystackButton {...paystackProps} />
//             ) : (
//               <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
//                 PLACE ORDER
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default PlaceOrder;
