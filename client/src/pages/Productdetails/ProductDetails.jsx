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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // get product
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/single-product/${
          params.slug
        }`
      );
      setLoading(false);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setLoading(false);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="mt-12 mx-10">
        {loading ? (
          <div className="container grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-4 bg-gray-200 animate-pulse border border-gray-200 rounded-md">
              <div className="h-full w-full p-1"></div>
            </div>
            <div className="col-span-12 lg:col-span-8 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="mt-4 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
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
              <h1 className="text-center text-3xl font-semibold">
                Product Details
              </h1>

              <h6 className=" text-xl font-semibold">Name: {product.name}</h6>
              <h6 className=" text-lg font-semibold text-gray-700">
                Price:{" "}
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h6>
              <h6 className=" text-base font-semibold text-gray-700">
                Category: {product?.category?.name}
              </h6>
              <h6 className=" text-md font-medium text-gray-600">
                Description: {product.description}
              </h6>
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
        )}
      </div>
      <div className="mt-8 mx-10">
        <h6 className=" text-2xl font-semibold">Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <>
              <div
                className="w-full p-4  border border-gray-200 rounded-md shadow"
                style={{ width: "18rem" }}
              >
                <div class="h-72 bg-gray-200 animate-pulse"></div>
                <div>
                  <div>
                    <div class="h-6 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
                    <div class="h-6 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                  </div>
                  <div class="h-4 bg-gray-200 rounded w-full mt-2 animate-pulse"></div>
                  <div class="mt-2">
                    <div class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center h-8 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div
                className="w-full p-4  border border-gray-200 rounded-md shadow"
                style={{ width: "18rem" }}
              >
                <div class="h-72 bg-gray-200 animate-pulse"></div>
                <div>
                  <div>
                    <div class="h-6 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
                    <div class="h-6 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                  </div>
                  <div class="h-4 bg-gray-200 rounded w-full mt-2 animate-pulse"></div>
                  <div class="mt-2">
                    <div class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center h-8 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div
                className="w-full p-4  border border-gray-200 rounded-md shadow"
                style={{ width: "18rem" }}
              >
                <div class="h-72 bg-gray-200 animate-pulse"></div>
                <div>
                  <div>
                    <div class="h-6 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
                    <div class="h-6 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                  </div>
                  <div class="h-4 bg-gray-200 rounded w-full mt-2 animate-pulse"></div>
                  <div class="mt-2">
                    <div class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center h-8 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            relatedProducts?.map((p) => (
              <div
                className="w-full p-4 bg-white border border-gray-200 rounded-md shadow"
                style={{ width: "18rem" }}
              >
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
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                      {p.name}
                    </h5>
                    <p className="text-lg font-bold text-gray-700">
                      {product?.price?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <p className="text-md  text-gray-500">
                    {p.description.substring(0, 30)}
                  </p>
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
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
