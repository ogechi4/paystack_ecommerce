
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import Cart from './pages/Cart'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/Forgotpassword'
import Resetpassword from './pages/Resetpassword'



function App() {
  

  return (
    <>
     <div className='w-full mx-auto h-auto '>
          <Navbar/>
        </div>
      <div className='px-4 sm:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
       
       
        {/* <Home /> */}
        <SearchBar />
         <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route path='/collection' element={<Collection />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/place-order' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/tokenVerify' element={<VerifyEmail />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<Resetpassword />} />
          
         </Routes>
         </div>
         
         <div className='w-full mx-auto h-auto'>
         <Footer />
         </div>
         
      
    </>
  )
}

export default App
