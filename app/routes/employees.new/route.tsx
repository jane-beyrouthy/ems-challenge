import EmployeeForm from "~/components/EmployeeForm";
import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const db = await getDB();

  await db.run(
    "INSERT INTO employees (full_name, email, phone, dob, job_title, department, salary, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      formData.get("full_name"),
      formData.get("email"),
      formData.get("phone"),
      formData.get("dob"),
      formData.get("job_title"),
      formData.get("department"),
      formData.get("salary"),
      formData.get("start_date"),
      formData.get("end_date"),
    ]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  return (
    <div>
      <h1>Create New Employee</h1>
      <EmployeeForm method="post" />
      <hr />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
