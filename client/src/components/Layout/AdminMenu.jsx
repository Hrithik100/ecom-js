import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const AdminMenu = () => {

  return (
    <>
      <div className="text-center">
        <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-2xl">
          Admin Panel
        </h4>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Orders
          </NavLink>
          {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
