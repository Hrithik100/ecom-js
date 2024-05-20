import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";

const AdminRoute = lazy(() => import("./components/Routes/AdminRoute"));
const PrivateRoute = lazy(() => import("./components/Routes/Private"));
const About = lazy(() => import("./pages/About"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const CreateCategory = lazy(() => import("./pages/Admin/CreateCategory"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct"));
const Users = lazy(() => import("./pages/Admin/Users"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Policy = lazy(() => import("./pages/Policy"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Products = lazy(() => import("./pages/Admin/Products"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() =>
  import("./pages/Productdetails/ProductDetails")
);
const Categories = lazy(() => import("./pages/Categories"));
const CategoryProduct = lazy(() =>
  import("./pages/Categoryproduct/CategoryProduct")
);
const CartPage = lazy(() => import("./pages/Cartpage/CartPage"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
