import React, { useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from '../context/ShopContext'

const Resetpassword = () => {
  const {navigate,backendUrl} =useContext(ShopContext)
  const { token } = useParams(); // Extract token from the URL
  // const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
// sending the newpassword and the token in the url
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/resetPassword/${token}`,  
        { newPassword: password },  
      );

      if (response.data.success) {
        setSuccess("Password reset successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      } else {
        setError(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl pt-2" >Reset Password</h2>
      {success ? (
        <p style={{ color: "green" }}>{success}</p>
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handlePasswordReset}>
            <div>
              <label className="block text-sm font-medium">New Password <span className="text-red-600">*</span></label><br />
              <input
                className="border px-3 py-2 lg:w-[50%] w-[70%] rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium">Confirm New Password <span className="text-red-600">*</span></label><br />
              <input
                className="border px-3 py-2 lg:w-[50%] w-[70%] rounded"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-orange-400 w-[50%] mt-4 text-white px-4 py-2 rounded">Reset Password</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Resetpassword;
