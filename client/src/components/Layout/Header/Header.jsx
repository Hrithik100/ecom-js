import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/ecom.png";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../../context/Cart";
import { useAuth } from "../../../context/Auth";
import useCategory from "../../hooks/useCategory";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import { Badge, Dropdown, Space } from "antd";
import { IoIosArrowDown } from "react-icons/io";

const items = [
  {
    key: "1",
    label: (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),

    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const Header = () => {
  let [open, setOpen] = useState(false);
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
          Dashboard
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];

  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-50">
      <div className="lg:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <Link to="/" className="cursor-pointer flex items-center gap-1">
          <img src={logo} alt="" placeholder="logo-img" className="w-10 h-10" />
          <span className="font-bold text-2xl">Ecom</span>
        </Link>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer lg:hidden"
        >
          {open ? (
            <RxCross2 className=" text-2xl" />
          ) : (
            <GiHamburgerMenu className=" text-2xl" />
          )}
        </div>
        {/* linke items */}
        <ul
          className={`mb-0 bg-blue-200 lg:flex lg:items-center lg:p-0 p-4 absolute lg:static lg:bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto  transition-all duration-500 ease-in ${
            open ? "top-16" : "top-[-490px]"
          }`}
        >
          {/* {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))} */}
          <SearchInput />
          <li className="lg:ml-8 lg:my-0 my-7">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-blue-400 duration-500 text-base font-semibold"
            >
              Home
            </NavLink>
          </li>
          <li className="lg:ml-8 lg:my-0 my-7">
            <NavLink
              to="/categories"
              className="text-gray-800 hover:text-blue-400 duration-500 text-base font-semibold"
            >
              Categories
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li className="lg:ml-8 lg:my-0 my-7 ">
                <NavLink
                  to="/login"
                  className="text-gray-800 hover:text-blue-400 duration-500 text-base font-semibold"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="lg:ml-8 md:my-0 my-7 lg:block hidden">
                <Dropdown menu={{ items }}>
                  <Link onClick={(e) => e.preventDefault()}>
                    <Space className="font-semibold text-gray-800 hover:text-blue-400 duration-500 text-base">
                      {auth?.user?.name}
                      <IoIosArrowDown />
                    </Space>
                  </Link>
                </Dropdown>
              </li>
              <li className=" lg:hidden my-7">
                <NavLink
                  className="font-semibold text-gray-800 hover:text-blue-400 duration-500 text-base"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="lg:hidden my-7">
                <NavLink
                  onClick={handleLogout}
                  className="font-semibold text-gray-800 hover:text-blue-400 duration-500 text-base"
                  to="/login"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <li className="lg:ml-8 lg:my-0 my-7 ">
            <NavLink className="" to="/cart">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                <span className="text-gray-800 hover:text-blue-400 duration-500 text-base font-semibold">
                  Cart
                </span>
              </Badge>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
