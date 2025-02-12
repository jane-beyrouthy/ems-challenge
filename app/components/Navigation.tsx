import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Employees
      </NavLink>
      <NavLink
        to="/timesheets"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Timesheets
      </NavLink>
    </nav>
  );
}
