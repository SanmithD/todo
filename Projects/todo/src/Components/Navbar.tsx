import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row justify-between gap-[20px] md:gap-[30px] lg:gap-[40px] text-[16px] md:text-3xl lg:text-5xl px-3 md:px-7 lg:px-8 py-5 text-gray-400 font-bold w-[50%] border-0 border-b-3 border-b-green-500 rounded-2xl py-3 md:py-5 lg:py-6">
      <Link
        to="/addTodo"
        className={`hover:text-gray-200 hover:underline text-shadow-lg/20`}
      >
        ADD
      </Link>
      <Link
        to="/?todos=active"
        className={`hover:text-gray-200 hover:underline text-shadow-lg/20 `}
      >
        Active
      </Link>
      <Link
        to="/?todos=completed"
        className={`hover:text-gray-200 hover:underline text-shadow-lg/20`}
      >
        Completed
      </Link>
    </nav>
  );
}

export default Navbar;
