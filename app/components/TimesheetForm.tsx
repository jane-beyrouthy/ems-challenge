import { Form } from "react-router";
import { useState } from "react";

export default function TimesheetForm({
  method,
  timesheet,
  employees,
}: {
  method: "post" | "put";
  timesheet?: any;
  employees: any[];
}) {
  const [formData, setFormData] = useState({
    employee_id: timesheet?.employee_id || "",
    start_time: timesheet?.start_time || "",
    end_time: timesheet?.end_time || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {method === "post" ? "Create New Timesheet" : "Edit Timesheet"}
      </h2>

      <Form method={method}>
        {/* Employee Dropdown */}
        <div className="mb-4">
          <label htmlFor="employee_id">Employee</label>
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label htmlFor="end_time">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {method === "post" ? "Create Timesheet" : "Update Timesheet"}
        </button>
      </Form>

      {/* Navigation Buttons */}
      <div className="mt-4">
        {timesheet?.employee_id && (
          <a
            href={`/employees/${timesheet.employee_id}`}
            className="mr-4 text-blue-600 underline"
          >
            View Employee
          </a>
        )}
        <a href="/employees" className="mr-4 text-blue-600 underline">
          Employee List
        </a>
        <a href="/timesheets" className="text-blue-600 underline">
          Timesheets List
        </a>
      </div>
    </div>
  );
}
