import { Link } from "react-router";

export default function RootPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-6">
        Welcome to Employee Management System
      </h1>

      <div className="flex space-x-4">
        <Link
          to="/employees/new"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Add New Employee
        </Link>
        <Link
          to="/timesheets/new"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Add New Timesheet
        </Link>
      </div>
    </div>
  );
}
