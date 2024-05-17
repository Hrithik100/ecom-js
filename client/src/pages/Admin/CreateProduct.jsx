import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate()

  // get all categories
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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product
  const handleCreate = async(e) =>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)
      const {data} = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/create-product`, productData)
      if(data?.success){
        toast.success("Product created Successfully")
        navigate('/dashboard/admin/products')
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <Layout title={"Create Product -  Ecommerce app"}>
      <div className=" m-3 p-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <AdminMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl font-semibold">Create Product</h1>
            <div className="">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="my-7">
                <label className="bg-gray-800 text-white rounded-lg px-5 py-2.5 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 text-center">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-7">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                    
                      className=" rounded-lg h-52 w-52"
                    />
                  </div>
                )}
              </div>
              <div className="mb-7">
                <input
                  type="text"
                  value={name}
                  placeholder="Write the product name"
                  className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <input
                  type="number"
                  value={price}
                  placeholder="Write the price"
                  className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write the quantity"
                  className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  // onChange={(e) => setQuantity(e.target.value)}
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    setQuantity(value);
                  }}
                />
              </div>
              <div className="mb-7">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-7">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center" onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
