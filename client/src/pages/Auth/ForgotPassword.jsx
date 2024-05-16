import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");


  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( email, password);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce app"}>
         <div className="flex items-center justify-center min-h-[70vh]">
        <form onSubmit={handleSubmit} className=" w-11/12 bg-white rounded-lg shadow lg:max-w-lg p-4">
          <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl mb-5">Reset Password</h4>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Enter your favourite sport"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="New Password"
              required
            />
          </div>
          <button type="submit" className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword