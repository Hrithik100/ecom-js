import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowdata, setRowdata] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  console.log(orders);
  return (
    <Layout title={"User Orders - Ecommerce app"}>
      <div className=" p-3 m-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-white p-4 rounded-lg">
            <UserMenu />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-xl font-semibold">All orders</h1>
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
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p,i) => (
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

            <div>
              {orders.length > 0 ? (
                <Paper
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
                                {or?.status}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.buyer?.name}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.products?.map((p, index) => (
                                  <span>
                                    {" "}
                                    {p.name}{" "}
                                    {index !== or.products.length - 1 && ", "}
                                  </span>
                                ))}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {moment(or?.createdAt).fromNow()}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {or?.payment.success ? "Success" : "Failed"}
                              </TableCell>
                              <TableCell align="center" className="tableCell">
                                {/* {or?.products?.length} */}
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
                </Paper>
              ) : (
                <h2>No orders found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
