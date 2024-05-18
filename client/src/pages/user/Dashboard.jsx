import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from './../../components/Layout/UserMenu';
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"User Dashboard - Ecommerce App"}>
      <div className=" m-3 p-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <UserMenu/>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="">
              <h3 className="text-lg font-semibold">User Name : {auth?.user?.name}</h3>
              <h3 className="text-lg font-semibold">User Email : {auth?.user?.email}</h3>
              <h3 className="text-lg font-semibold">User Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
