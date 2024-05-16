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
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No products found"
              : `Found ${values?.result.length}`}
          </h6>
          <div className="flex flex-wrap mt-4 gap-4 justify-center lg:justify-start">
            {values?.result.map((p) => (
              <div  className="w-full p-4 bg-white border border-gray-200 rounded-md shadow" style={{ width: "18rem" }}>
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_API
                  }/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹ {p.price}</p>
                  {/* <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button> */}
                  <div className="card-name-price">
                    <button
                      class="btn btn-info ms-1"
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
