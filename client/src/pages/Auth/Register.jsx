import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, address, phone);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
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
    <Layout title={"Register - Ecommerce app"}>
      <div className="flex items-center justify-center min-h-[70vh] mt-12">
        <form
          onSubmit={handleSubmit}
          className=" w-11/12 bg-white rounded-lg shadow lg:max-w-lg p-4"
        >
          <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl mb-5">
            Registration
          </h4>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Name"
              required
              autoFocus
            />
          </div>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block"
              placeholder="What is your favourite sports"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              class=" font-semibold text-blue-700 hover:underline "
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
