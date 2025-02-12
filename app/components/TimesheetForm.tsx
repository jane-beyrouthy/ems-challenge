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
    <div className="form-container">
      <Form method={method} className="timesheet-form">
        {/* Employee Dropdown */}
        <div className="form-group">
          <label htmlFor="employee_id">
            Employee <span className="required">*</span>
          </label>
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
        <div className="form-group">
          <label htmlFor="start_time">
            Start Time <span className="required">*</span>
          </label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Time */}
        <div className="form-group">
          <label htmlFor="end_time">
            End Time <span className="required">*</span>
          </label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="button-container">
          <button type="submit" className="submit-button">
            {method === "post" ? "Create Timesheet" : "Update Timesheet"}
          </button>
        </div>
      </Form>
    </div>
  );
}
