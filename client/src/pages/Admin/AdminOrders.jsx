import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import moment from "moment";
import { useAuth } from "../../context/Auth";
import { Select } from "antd";
import { Paper, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowdata, setRowdata] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Layout title={"All Orders"}>
      <div className=" m-3 p-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <AdminMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl font-semibold">All orders</h1>
            <div>
              {/* {orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`${
                                import.meta.env.VITE_REACT_APP_API
                              }/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100%"
                              height={"130px"}
                            />
                          </div>
                          <div className="col-md-4">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : ₹ {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                );
              })} */}
              {
                orders.length > 0 ? (   <Paper
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    marginTop: "2rem",
                    borderRadius: "0.6rem",
                  }}
                >
                  <TableContainer component={Paper} className="cardContent">
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Sl.no
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Status
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Buyer
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Product
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Date
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Payment
                          </TableCell>
                          <TableCell
                            align="center"
                            className=" !bg-gray-500 !text-white !font-semibold !text-base"
                          >
                            Price
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((or, i) => (
                            <TableRow
                              key={or.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                className="!text-base"
                              >
                                {i + 1}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                <Select
                                  bordered={false}
                                  onChange={(value) =>
                                    handleChange(or._id, value)
                                  }
                                  defaultValue={or?.status}
                                >
                                  {status.map((s, i) => (
                                    <Option key={i} value={s}>
                                      {s}
                                    </Option>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.buyer?.name}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.products?.map((p)=> p.name)}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {moment(or?.createdAt).fromNow()}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.payment.success ? "Success" : "Failed"}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                              {`₹${or?.payment.transaction.amount.toLocaleString("en-IN")}`}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <div className="">
                          {o?.products?.map((p, i) => (
                            <div className="flex" key={p._id}>
                              <div className="">
                                <img
                                  src={`${
                                    import.meta.env.VITE_REACT_APP_API
                                  }/api/v1/product/product-photo/${p._id}`}
                                  className="rounded-lg h-24 w-24"
                                  alt={p.name}
                              
                                />
                              </div>
                              <div className="col-md-4">
                                <p>{p.name}</p>
                                <p>{p.description.substring(0, 30)}</p>
                                <p>Price : ₹ {p.price}</p>
                              </div>
                            </div>
                          ))}
                        </div> */}
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>):(<h2>No orders found</h2>)
              }
           
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
