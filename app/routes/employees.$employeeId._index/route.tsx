import EmployeeForm from "~/components/EmployeeForm";
import {
  useLoaderData,
  redirect,
  type LoaderFunction,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";

export const loader: LoaderFunction = async ({ params }) => {
  const { employeeId } = params as { employeeId: string };
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [
    employeeId,
  ]);

  return { employee };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { employeeId } = params as { employeeId: string };
  const formData = await request.formData();
  const db = await getDB();

  await db.run(
    "UPDATE employees SET full_name=?, email=?, phone=?, dob=?, job_title=?, department=?, salary=?, start_date=?, end_date=? WHERE id=?",
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
      employeeId,
    ]
  );

  return redirect("/employees");
};

export default function EditEmployeePage() {
  const { employee } = useLoaderData() as { employee: any };
  return (
    <div>
      <div>
        <h1>Edit Employee</h1>
        <EmployeeForm method="put" employee={employee} />
      </div>
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/employees/new">New Employee</a>
        </li>
        <li>
          <a href="/timesheets/">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
