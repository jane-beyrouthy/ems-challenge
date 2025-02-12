import { Form, useNavigation } from "react-router";
import { useState } from "react";

export default function EmployeeForm({
  method,
  employee,
}: {
  method: "post" | "put";
  employee?: any;
}) {
  const navigation = useNavigation();

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
    <div className="form-container">
      <Form method={method} className="employee-form">
        <div className="form-grid">
          {/* Left Column */}
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="full_name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="job_title">
                Job Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">
                Salary <span className="required">*</span>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">
                Department <span className="required">*</span>
              </label>
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

            <div className="form-group">
              <label htmlFor="start_date">
                Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Centered Submit Button */}
        <div className="button-container">
          <button
            type="submit"
            className="submit-button"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting"
              ? "Saving..."
              : method === "post"
              ? "Create Employee"
              : "Update Employee"}
          </button>
        </div>
      </Form>
    </div>
  );
}
