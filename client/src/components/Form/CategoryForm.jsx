import React, { useState } from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900  p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
