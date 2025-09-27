import { NavLink } from "react-router";

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition-colors ${
      isActive ? "bg-primary-3 text-white" : "hover:bg-primary"
    }`;

  return (
    <nav className="bg-primary-2 shadow-md p-4 flex items-center justify-center gap-4 font-bold fixed bottom-0 w-full">
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