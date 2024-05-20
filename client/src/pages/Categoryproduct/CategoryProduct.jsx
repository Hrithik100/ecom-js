import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./CategoryProduct.css";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-4">
        <div className=" mx-4 rounded-md mb-4">
        <h4 className="text-center text-xl font-semibold">Category: {category?.name}</h4>
        <h6 className="text-center text-md text-gray-600 font-semibold">{products?.length} <span>{products.length > 1 ? "results" : "result"}</span> found</h6>
        <div className="">
          <div className="mx-4">
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {products?.map((p) => (
                <div
                  className="w-full p-4 bg-white border border-gray-200 rounded-md shadow" style={{ width: "18rem" }}
                  key={p._id}
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
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900">{p.name}</h5>
                      <h5 className="text-lg font-bold text-gray-700">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="text-md  text-gray-500">
                      {p.description.substring(0, 30)}....
                    </p>
                    <div className="">
                      <button
                        class="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                    {/* <button class="btn btn-secondary ms-1">Add to Cart</button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default CategoryProduct;
