import { Form, useLoaderData } from "react-router";
import { useState } from "react";

export default function EmployeeForm({
  method,
  employee,
}: {
  method: "post" | "put";
  employee?: any;
}) {
  const [formData, setFormData] = useState({
    full_name: employee?.full_name || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    dob: employee?.dob || "",
    job_title: employee?.job_title || "",
    department: employee?.department || "",
    salary: employee?.salary || "",
    start_date: employee?.start_date || "",
    end_date: employee?.end_date || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form method={method}>
      <div className="grid grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            min="500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Date (Optional) */}
        <div>
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        {method === "post" ? "Create Employee" : "Update Employee"}
      </button>
    </Form>
  );
}
