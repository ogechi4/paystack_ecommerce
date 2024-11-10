import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Verification() {
    const { setToken, backendUrl, navigate } = useContext(ShopContext)
    const [verificationCode, setVerificationCode] = useState("")

    const verifyAccount = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/user/tokenVerify', { token: verificationCode })
            
            if (response.data.success) {
                setToken(response.data.token) // Set token upon successful verification
                localStorage.setItem('token', response.data.token)
                navigate('/login') // Redirect to the home page
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Verification failed. Please try again.")
        }
    }

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <h2 className="text-2xl">Enter Verification Code</h2>
            <input onChange={(e) => setVerificationCode(e.target.value)} value={verificationCode} type="password" placeholder="Verification Code" className="w-full px-3 py-2 border border-gray-400" required />
            <button onClick={verifyAccount} className="bg-black text-white font-light px-8 py-2 mt-4">Verify</button>
        </div>
    )
}

export default Verification
