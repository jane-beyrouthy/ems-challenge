import { useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";
import EmployeeListView from "~/components/EmployeeListView";
import { useState } from "react";

export async function loader() {
  const db = await getDB();
  const employees = await db.all(
    "SELECT id, full_name, email, phone, job_title, department FROM employees;"
  );

  // Extract unique department names for filtering
  const departments = [
    "All departments",
    ...new Set(employees.map((emp) => emp.department)),
  ];

  return { employees, departments };
}

export default function EmployeesPage() {
  const { employees, departments } = useLoaderData() as {
    employees: any[];
    departments: string[];
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All departments");

  // Filter employees dynamically based on search term and department
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.full_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All departments" ||
      employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  return (
    <div className="employees-page">
      {/* Search Bar */}
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          Search:
        </label>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Department Filter */}
      <div className="filter-container">
        <label htmlFor="department-filter" className="filter-label">
          Filter by Department:
        </label>
        <select
          id="department-filter"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="filter-select"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Employee List */}
      <EmployeeListView employees={filteredEmployees} />
    </div>
  );
}
