import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()
  return (
    <Layout title={"Search results"}>
      <div className="container mt-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Search Results</h1>
          <h6 className="text-md text-gray-600 font-semibold">
            {values?.result.length < 1
              ? "No products found"
              : `Found ${values?.result.length}`}
          </h6>
          <div className="flex flex-wrap mt-4 gap-4 justify-center ">
            {values?.result.map((p) => (
              <div  className="w-full p-4 bg-white border border-gray-200 rounded-md shadow" style={{ width: "18rem" }}>
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_API
                  }/api/v1/product/product-photo/${p._id}`}
                  className="h-72 hover:scale-90 transform 
                  transition duration-500"
                  alt={p.name}
                />
                <div className="">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">{p.name}</h5>
                  <p className="text-md  text-gray-500">{p.description.substring(0, 30)}</p>
                  <p className="text-lg font-bold text-gray-700">₹ {p.price}</p>
                  {/* <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button> */}
                  <div className="card-name-price">
                    <button
                      class="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-1"
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
      </div>
    </Layout>
  );
};

export default Search;
