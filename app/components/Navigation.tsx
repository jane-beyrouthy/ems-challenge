import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Employee Management</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                isActive
                  ? "font-bold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
            >
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/timesheets"
              className={({ isActive }) =>
                isActive
                  ? "font-bold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
            >
              Timesheets
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
