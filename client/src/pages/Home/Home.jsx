import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../../components/Price/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import "./Home.css";
const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container px-4 grid grid-cols-12 lg:pt-5  gap-4 ">
        <div className="mt-4 p-4 col-span-12 bg-white rounded-md lg:col-span-2">
          <h4 className="text-start">Filter By Category</h4>
          <div className="flex gap-2 lg:flex-col flex-wrap mt-3 ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                style={{marginInlineStart:0}}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-start mt-4">Filter By Price</h4>
          <div className="mt-3">
            <Radio.Group className="flex flex-wrap gap-2 lg:flex-col" onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-4 lg:mt-6">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="mt-4  col-span-12 lg:col-span-10">
          {/* <h1 className="text-center">All Products</h1> */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {products?.map((p) => (
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
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <p className="text-md  text-gray-500">{p.description.substring(0, 30)}</p>
                  <div className="flex justify-between">
                    <button
                      className="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? (
                "Loading ...."
              ) : (
                <>
                  {""}Loadmore <AiOutlineReload />
                </>
              )}
            </button>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
