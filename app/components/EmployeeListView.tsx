import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function EmployeeListView({ employees }: { employees: any[] }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 2;

  // Calculate the indexes for slicing the employee array
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <div className="employee-list-container">
      <div className="add-employee-container">
        <button onClick={() => navigate("/employees/new")} className="button">
          Add New Employee
        </button>
      </div>
      <h2 className="list-title">Employees List</h2>

      <div className="employee-list">
        {paginatedEmployees.map((employee) => (
          <div
            key={employee.id}
            className="employee-card"
            onClick={() => navigate(`/employees/${employee.id}`)}
          >
            <h3 className="employee-name">{employee.full_name}</h3>
            <p className="employee-role">
              {employee.job_title} - {employee.department}
            </p>
            <p className="employee-email">{employee.email}</p>
            <p className="employee-phone">{employee.phone}</p>
            <div className="edit-container">
              <Link to={`/employees/${employee.id}`} className="edit-button">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
