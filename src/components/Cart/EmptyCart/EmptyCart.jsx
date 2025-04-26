import { Link } from "react-router-dom";

export default function EmptyCart({ msg1, msg2 }) {
  return (
    <section className="text-center dark:text-white">
      <h2 className="mb-10 font-medium text-4xl sm:text-6xl md:text-7xl">
        Your {msg1} is Empty
      </h2>
      <p className="mb-8">
        <Link to="/products" className="text-secondary font-semibold me-2">
          Add products
        </Link>
        {msg2}
      </p>
    </section>
  );
}
