import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "./CartPage.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const updatedCart = cart.map(item => ({
      ...item,
      cartQuantity: item.cartQuantity || 1 // Initialize cartQuantity if not present
    }));
    setCart(updatedCart);
  }, []);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.cartQuantity; // Using cartQuantity to track cart item quantity
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return "0"; // Return 0 in case of an error
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (myCart[index].cartQuantity < myCart[index].quantity) { // Check against available quantity
        myCart[index].cartQuantity += 1;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (myCart[index].cartQuantity > 1) {
        myCart[index].cartQuantity -= 1;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      } else {
        removeCartItem(pid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(cart);
  return (
    <Layout>
      <div className="container">
        <div className="">
          <div className="">
            <h1 className="text-center mt-4 text-lg lg:text-2xl  font-bold">
              {!auth?.user
                ? "Welcome Guest"
                : `Welcome  ${auth?.token && auth?.user?.name}`}
              {/* <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p> */}
            </h1>
          </div>
        </div>
        <div className=" mx-5">
          <div className="grid grid-cols-12 gap-6 lg:gap-9">
            <div className="col-span-12 lg:col-span-8 bg-white rounded-lg p-4">
            <p className="text-base lg:text-xl font-bold">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
              {cart?.map((p) => (
                <div
                  className="flex flex-col lg:flex-row lg:justify-between lg:items-center"
                  key={p._id}
                >
                  <div className="flex items-center">
                    <div className="">
                      <img
                        src={`${
                          import.meta.env.VITE_REACT_APP_API
                        }/api/v1/product/product-photo/${p._id}`}
                        className=" w-24 h-24"
                        alt={p.name}
                      />
                    </div>
                    <div className="">
                      <p className="text-base font-semibold text-gray-700">{p.name}</p>
                      <p className="hidden ">
                        {p.description.substring(0, 30)}
                      </p>
                      <p className="text-base font-semibold text-gray-500">Price : ₹ {p.price}</p>
                    </div>
                    <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 text-gray-800 font-bold rounded-l"
                          onClick={() => decrementQuantity(p._id)}
                          // disabled={p.cartQuantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100 text-gray-800 font-semibold">{p.cartQuantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 text-gray-800 font-bold rounded-r disabled:cursor-not-allowed"
                          onClick={() => incrementQuantity(p._id)}
                          disabled={p.cartQuantity >= p.quantity} // Check against available quantity
                        >
                          +
                        </button>
                      </div>
                  </div>
                  <div className=" pl-3">
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr className=" lg:hidden" />
                </div>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
              <h2 className="text-2xl font-semibold">Cart Summary</h2>
              <p className="text-lg font-semibold">Total | Checkout | Payment</p>
          
              <div className="p-4 bg-[#C4DFDF] rounded-lg">
                <h4 className="text-base font-semibold">Total : {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4 className="text-base font-semibold">Current Address: {auth?.user?.address}</h4>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
