import { Link, useNavigate } from "react-router";

export default function EmployeeListView({ employees }: { employees: any[] }) {
  const navigate = useNavigate();
  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employees/${employeeId}`);
  };

  return (
    <div className="employee-list-container">
      <h2 className="list-title">Employees List</h2>

      <div className="add-employee-container">
        <Link to="/employees/new" className="add-employee-button">
          Add New Employee
        </Link>
      </div>

      <div className="employee-list">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="employee-card"
            onClick={() => handleEmployeeClick(employee.id)}
          >
            <h3 className="employee-name">{employee.full_name}</h3>
            <p className="employee-role">
              {employee.job_title} - {employee.department}
            </p>
            <p className="employee-email">{employee.email}</p>
            <p className="employee-phone">{employee.phone}</p>
            <Link to={`/employees/${employee.id}`} className="edit-button">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
