import TimesheetForm from "~/components/TimesheetForm";
import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees;");
  return { employees };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const db = await getDB();

  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)",
    [
      formData.get("employee_id"),
      formData.get("start_time"),
      formData.get("end_time"),
    ]
  );

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData() as { employees: any[] };
  return (
    <div>
      <h1>Create New Timesheet</h1>
      <TimesheetForm method="post" employees={employees} />
    </div>
  );
}
