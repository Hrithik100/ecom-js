import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../components/hooks/useCategory";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container mt-16">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {categories?.map((c) => (
            <Link to={`/category/${c.slug}`} className="">
              <div
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-1 cursor-pointer"
                key={c._id}
              >
                <div className="">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
