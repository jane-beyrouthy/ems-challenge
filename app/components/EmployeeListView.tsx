import { Link } from "react-router";

export default function EmployeeListView({ employees }: { employees: any[] }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Employees List</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        <Link to="/employees/new">Add New Employee</Link>
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Job Title</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="text-center border">
              <td className="border p-2">{employee.full_name}</td>
              <td className="border p-2">{employee.email}</td>
              <td className="border p-2">{employee.phone}</td>
              <td className="border p-2">{employee.job_title}</td>
              <td className="border p-2">{employee.department}</td>
              <td className="border p-2">
                <Link
                  to={`/employees/${employee.id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
