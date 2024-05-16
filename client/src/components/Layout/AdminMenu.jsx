import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
      <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-2xl">Admin Panel</h4>
        <div className="flex flex-col gap-2">
          
          <NavLink to="/dashboard/admin/create-category" className="bg-gray-400 rounded-lg py-3">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="bg-gray-400 rounded-lg py-3">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="bg-gray-400 rounded-lg py-3">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/orders" className="bg-gray-400 rounded-lg py-3">
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
