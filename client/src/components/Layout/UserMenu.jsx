import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-2xl">
          Dashboard
        </h4>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) => {
              return isActive
                ? "bg-blue-700 rounded-lg py-3 text-white"
                : "bg-white rounded-lg py-3 border border-gray-700";
            }}
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
