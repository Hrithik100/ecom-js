import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "../../context/Cart";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/single-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="mt-12 mx-10">
        <div className="container grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-md">
            <img
              src={`${
                import.meta.env.VITE_REACT_APP_API
              }/api/v1/product/product-photo/${product._id}`}
              className="h-full w-full p-1"
              alt={product.name}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-center text-3xl font-semibold">Product Details</h1>
            
            <h6 className=" text-xl font-semibold">Name: {product.name}</h6>
            <h6 className=" text-lg font-semibold text-gray-700">
              Price:{" "}
              {product?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
            <h6 className=" text-base font-semibold text-gray-700">Category: {product?.category?.name}</h6>
            <h6 className=" text-md font-medium text-gray-600">Description: {product.description}</h6>
            <div className="mt-4">
              <button
                 className="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-10">
        <h6 className=" text-2xl font-semibold">Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="flex flex-wrap gap-4">
          {relatedProducts?.map((p) => (
            <div className="w-full p-4 bg-white border border-gray-200 rounded-md shadow" style={{ width: "18rem" }}>
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-photo/${p._id}`}
                className="h-72 hover:scale-90 transform 
                  transition duration-500"
                alt={p.name}
              />
              <div className="">
                <div className="">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">{p.name}</h5>
                  <p className="text-lg font-bold text-gray-700">
                    {product?.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
                <p className="text-md  text-gray-500">{p.description.substring(0, 30)}</p>
                <div className="">
                  <button
                    class="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
