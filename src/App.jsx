// libraries
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import { Toaster } from "react-hot-toast";
import { Detector } from "react-detect-offline";
// components
import Layout from "./components/Layout/Layout";
const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products"));
const Cart = lazy(() => import("./components/Cart/Cart"));
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Forms/Register/Register";
import Login from "./components/Forms/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Error from "./components/Error/Error";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const ProductDetails = lazy(() =>
  import("./components/Products/ProductDetails/ProductDetails")
);
import CartContextProvider from "./context/CartContext";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
const CategoryRelatedProducts = lazy(() =>
  import(
    "./components/Categories/CategoryRelatedProducts/CategoryRelatedProducts"
  )
);
const Wishlist = lazy(() => import("./components/Wishlist/Wishlist"));

import WishlistContextProvider from "./context/WishlistContext";
import ForgetPassword from "./components/Forms/ResetPasswordFormWrapper/ForgetPassword/ForgetPassword";
import SendCode from "./components/Forms/ResetPasswordFormWrapper/SendCode/SendCode";
import ResetPassword from "./components/Forms/ResetPasswordFormWrapper/ResetPassword/ResetPassword";
import UnauthedRoute from "./components/UnauthedRoute/UnauthedRoute";
import Loader from "./components/shared/Loader/Loader";
import { RiWifiOffLine } from "react-icons/ri";
import Account from "./components/Account/Account";

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
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Wishlist />
            </Suspense>
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
        path: "my-account",
        element: (
          <ProtectedRoute>
            <Account />
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
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:categoryId/:category",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <CategoryRelatedProducts />
            </Suspense>
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
    <>
      <Detector
        render={({ online }) => (
          <div
            className={`${
              !online &&
              "fixed bottom-20 end-2 bg-red-100 border border-red-300 p-4 text-center rounded-md z-30 font-semibold text-secondary"
            } flex gap-x-3 items-center`}
          >
            {!online && <RiWifiOffLine size={20} />}
            {!online && "You are currently offline"}
          </div>
        )}
      />
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
    </>
  );
}

export default App;
