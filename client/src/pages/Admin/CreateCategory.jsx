import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, Skeleton } from "antd";
import { Autocomplete, Box, Card, CardContent, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowdata, setRowdata] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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

  useEffect(() => {
    if (rowdata) {
      setCategories([rowdata]);
    } else {
      const getAllCategory = async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/categories`
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      };
      getAllCategory();
    }
  }, [rowdata]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Layout title={"Create Category - Ecommerce app"}>
      <div className=" m-3 p-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <AdminMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl font-semibold">Manage Category</h1>
            <div className="">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            {/* <div className="mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div> */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>

            {categories ? (
              <Paper sx={{ width: "100%", overflow: "hidden",marginTop:"2rem",borderRadius:"0.6rem" }}>
                <TableContainer component={Paper} className="cardContent">
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="table"
                  >
                    <TableHead >
                      <TableRow>
                        <TableCell align="center" className=" !bg-gray-500 !text-white !font-semibold !text-base">
                          Name
                        </TableCell>
                        <TableCell align="center" className=" !bg-gray-500 !text-white !font-semibold !text-base">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((category) => (
                          <TableRow
                            key={category.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              className="!text-base"
                            >
                              {category.name}
                            </TableCell>
                            <TableCell align="center" className="tableCell">
                              <div className="flex justify-center gap-4">
                                <button
                                  className="text-white  bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                  onClick={() => {
                                    setVisible(true);
                                    setUpdatedName(category.name);
                                    setSelected(c);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                  onClick={() => {
                                    handleDelete(category._id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
                  rowsPerPageOptions={[5]}
                  component="div"
                  count={categories.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
              </Paper>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
