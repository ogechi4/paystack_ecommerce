import React, { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Forgotpassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + '/api/user/forgotPassword', {
        email,
      });

      if (response.data.success) {
        setSuccess("Password reset link sent to your email.");
        setEmail(""); // Clear the email input
      } else {
        setError(response.data.message || "Failed to send reset link.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something  wrong.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-2xl pt-2">Forgot Password</h2>
      {success ? (
        <p style={{ color: "green" }}>{success}</p>
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleForgotPassword} className="">
            <div className="pt-3">
              <label className="block text-sm font-medium">Email Address:</label><br />
              <input
                className="border px-3 py-2 lg:w-[50%] w-[70%] rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your registered email"
              />
            </div>
            <button type="submit" className="bg-orange-400 w-[50%] mt-4 text-white px-4 py-2 rounded">Forgot Password</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Forgotpassword;
