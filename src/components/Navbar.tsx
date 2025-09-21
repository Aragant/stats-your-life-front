import { NavLink } from "react-router";

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-gray-100 shadow-md p-4 flex items-center justify-center gap-4">
      <NavLink to="/task" className={linkClass}>
        Task
      </NavLink>
      <NavLink to="/routine" className={linkClass}>
        Routine
      </NavLink>
      <NavLink to="/session" className={linkClass}>
        Session
      </NavLink>
    </nav>
  );
}

export default Navbar;