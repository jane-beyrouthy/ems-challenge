import { Link } from "react-router";

export default function RootPage() {
  return (
    <div className="container">
      <h1 className="welcome-title">Welcome to Employee Management System</h1>
      <div className="button-group">
        <Link to="/employees/new" className="button">
          Add New Employee
        </Link>
        <Link to="/timesheets/new" className="button">
          Add New Timesheet
        </Link>
      </div>
    </div>
  );
}
