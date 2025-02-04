// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// components
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Forms/Register/Register";
import Login from "./components/Forms/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Error from "./components/Error/Error";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import CategoryRelatedProducts from "./components/Categories/CategoryRelatedProducts/CategoryRelatedProducts";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistContextProvider from "./context/WishlistContext";
import ForgetPassword from "./components/Forms/ResetPasswordFormWrapper/ForgetPassword/ForgetPassword";
import SendCode from "./components/Forms/ResetPasswordFormWrapper/SendCode/SendCode";
import ResetPassword from "./components/Forms/ResetPasswordFormWrapper/ResetPassword/ResetPassword";
import UnauthedRoute from "./components/UnauthedRoute/UnauthedRoute";

const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:categoryId/:category",
        element: (
          <ProtectedRoute>
            <CategoryRelatedProducts />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "forgetpassword",
        element: (
          <UnauthedRoute>
            <ForgetPassword />
          </UnauthedRoute>
        ),
      },
      {
        path: "verifyresetcode",
        element: (
          <UnauthedRoute>
            <SendCode />
          </UnauthedRoute>
        ),
      },
      {
        path: "resetpassword",
        element: (
          <UnauthedRoute>
            <ResetPassword />
          </UnauthedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
