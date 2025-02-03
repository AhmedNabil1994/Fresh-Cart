import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { CartContext } from "../../context/CartContext";
import card_1 from "../../assets/checkout/Bkash.png";
import card_2 from "../../assets/checkout/Mastercard.png";
import card_3 from "../../assets/checkout/Nagad.png";
import card_4 from "../../assets/checkout/Visa.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";

export default function Checkout() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { cart, setCart, cashPayment, onlinePayment } = useContext(CartContext);
  const { setWishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  let validationSchema = yup.object().shape({
    details: yup
      .string()
      .min(5, "Min length is 5")
      // .max(20, "Max length is 50")
      .required("Details are required"),
    phone: yup
      .string()
      .matches(/^01[1025][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
    city: yup
      .string()
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Enter a valid city name")
      .required("City is required"),
  });

  const handleCashPayment = async () => {
    const toastId = toast.loading("Payment is processing......");
    setBtnLoading(true);
    const data = await cashPayment(formik.values);
    console.log(data, "cash");
    if (data.status === "success") {
      setBtnLoading(false);
      setCart(null);
      setWishlist(null);
      toast.success("Payment was done successfully.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
      navigate("/allorders");
    } else {
      setBtnLoading(false);
      toast.error(data.response.data.message, {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  const handleOnlinePayment = async () => {
    const toastId = toast.loading("Payment is processing...");
    setBtnLoading(true);
    const data = await onlinePayment(formik.values);
    console.log(data, "online");
    if (data.status === "success") {
      setBtnLoading(false);
      setWishlist(null);
      toast.success("Payment was done successfully.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        duration: 3000,
        id: toastId,
      });
      location.href = data.session.url;
    } else {
      setBtnLoading(false);
      toast.error("An error occured try again.", {
        position: "top-center",
        style: { fontFamily: "sans-serif" },
        id: toastId,
      });
    }
  };

  const handlePayment = () => {
    paymentMethod === "cash" ? handleCashPayment() : handleOnlinePayment();
    // console.log(cash, "cash status");
  };

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <>
      <section className="row justify-around">
        <div className="w-full lg:w-1/3">
          <h2 className="mb-12 text-4xl font-medium">Billing Details</h2>
          <form>
            <div className="w-full mb-8">
              <label
                htmlFor="details"
                className="text-base block mb-2 text-gray-600"
              >
                Your Details
              </label>
              <input
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="details"
                id="details"
                className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                required
              />
              {formik.errors.details && formik.touched.details && (
                <div className="py-2 my-2 text-sm text-red-700" role="alert">
                  <span className="font-medium">{formik.errors.details}</span>
                </div>
              )}
            </div>
            <div className="w-full mb-8 ">
              <label
                htmlFor="phone"
                className="text-base block mb-2 text-gray-600"
              >
                Your Phone
              </label>
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                name="phone"
                id="phone"
                className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                required
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="py-2 my-2 text-sm text-red-700" role="alert">
                  <span className="font-medium">{formik.errors.phone}</span>
                </div>
              )}
            </div>
            <div className="w-full mb-5 ">
              <label
                htmlFor="city"
                className="text-base block mb-2 text-gray-600"
              >
                Your City
              </label>
              <input
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="city"
                id="city"
                className="bg-[#f5f5f5] border-[#f5f5f5] text-gray-900 text-sm rounded-lg focus:ring-[#f5f5f5] focus:border-0 block w-full p-2.5 "
                required
              />
              {formik.errors.city && formik.touched.city && (
                <div className="py-2 my-2 text-sm text-red-700" role="alert">
                  <span className="font-medium">{formik.errors.city}</span>
                </div>
              )}
            </div>
          </form>
        </div>
        {cart && (
          <div className="w-full lg:w-2/5">
            <div className=" py-8 px-6">
              {cart.data.products.map((product) => (
                <div
                  className="flex flex-col justify-between mb-8 "
                  key={product._id}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-x-6">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-11 aspect-square object-cover -mt-1"
                      />
                      <p>{product.product.title}</p>
                    </div>
                    <p>${product.price * product.count}</p>
                  </div>
                </div>
              ))}
              <div className="flex flex-col justify-between mb-4 relative after:content-[''] after:w-full after:h-[2px] after:bg-slate-200 after:mt-4">
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <p>${cart.data.totalCartPrice}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between mb-4 relative after:content-[''] after:w-full after:h-[2px] after:bg-slate-200 after:mt-4">
                <div className="flex justify-between">
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
              </div>
              <div className="flex justify-between mb-8">
                <p>Total:</p>
                <p>${cart.data.totalCartPrice}</p>
              </div>
              <div className="flex justify-between">
                <div className="radio-buttons">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="online"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "online"}
                      name="default-radio"
                      className=" w-4 h-4 border-black focus:ring-transparent checked:bg-black"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Bank
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="cash"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "cash"}
                      name="default-radio"
                      className=" w-4 h-4 border-black focus:ring-transparent checked:bg-black"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Cash on delivery
                    </label>
                  </div>
                </div>
                <div className="visa-cards row gap-x-[2px] sm:gap-x-1 justify-center">
                  <img src={card_1} alt="card_1" className="w-11 h-7" />
                  <img src={card_2} alt="card_2" className="w-11 h-7" />
                  <img src={card_3} alt="card_3" className="w-11 h-7" />
                  <img src={card_4} alt="card_4" className="w-11 h-7" />
                </div>
              </div>
              <button
                type="submit"
                onClick={() => {
                  formik.handleSubmit();
                }}
                className=" mt-6 rounded bg-secondary sm:px-12 py-4 font-medium hover:bg-opacity-90  transition-colors duration-500 text-white w-full "
              >
                {btnLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
