import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"All Products"}>
      <div className=" m-3 p-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <AdminMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl font-semibold">All Products list</h1>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {loading ? (
                <>
                  <div
                    className="w-full h-full p-4  border border-gray-200 rounded-md shadow animate-pulse"
                    style={{ width: "18rem" }}
                  >
                    <div className="h-72 bg-gray-200 rounded-md"></div>
                    <div className="mt-2">
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 mt-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div
                    className="w-full h-full p-4  border border-gray-200 rounded-md shadow animate-pulse"
                    style={{ width: "18rem" }}
                  >
                    <div className="h-72 bg-gray-200 rounded-md"></div>
                    <div className="mt-2">
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 mt-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div
                    className="w-full h-full p-4  border border-gray-200 rounded-md shadow animate-pulse"
                    style={{ width: "18rem" }}
                  >
                    <div className="h-72 bg-gray-200 rounded-md"></div>
                    <div className="mt-2">
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 mt-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </>
              ) : (
                products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                  >
                    <div
                      className="w-full h-full p-4 bg-white border border-gray-200 rounded-md shadow"
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
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                          {p.name}
                        </h5>
                        <p className="text-lg font-bold text-gray-700">
                          {p.description.substring(0, 30)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
