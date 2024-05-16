import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( email, password);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
      <div className="flex items-center justify-center min-h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className=" w-11/12 bg-white rounded-lg shadow lg:max-w-lg p-4"
        >
          <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl mb-5">
            Login
          </h4>
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
            <button
              type="button"
              className="text-sm font-light text-gray-500"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
          >
            Login
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              class="font-semibold text-blue-700 hover:underline "
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
