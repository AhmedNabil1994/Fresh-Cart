export default function Brand({ brand }) {
  return (
    <>
      <div className="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mb-[60px] group px-[15px]">
        <div className="border border-slate-400 py-8 shadow-slate-300 shadow-sm group-hover:border-secondary group-hover:shadow-secondary transition duration-500">
          <img
            src={brand.image}
            alt={brand.name}
            className="transition duration-700 w-full"
          />
        <h2 className="pt-4 text-center group-hover:text-secondary font-semibold transition duration-500 dark:text-white">
          {brand.name}
        </h2>
        </div>
      </div>
    </>
  );
}
