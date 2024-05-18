import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, address, phone);
    try {
       const {data} = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile updated Successfully ")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"User Profile - Ecommerce app"}>
      <div className=" p-3 m-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <UserMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="">
              <form onSubmit={handleSubmit}>
                <h4 className="text-xl font-semibold">User Profile</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                 
                    placeholder="Name"
                    
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                 
                    placeholder="Email"
                    
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                   
                    placeholder="Password"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                   
                    placeholder="Phone"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                 
                    placeholder="Address"
                   
                  />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
