import TimesheetForm from "~/components/TimesheetForm";
import {
  useLoaderData,
  redirect,
  type LoaderFunction,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";

export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [
    params.timesheetId,
  ]);
  const employees = await db.all("SELECT id, full_name FROM employees;");

  if (!timesheet) {
    throw new Response("Timesheet not found", { status: 404 });
  }

  return { timesheet, employees };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const db = await getDB();

  await db.run(
    "UPDATE timesheets SET employee_id=?, start_time=?, end_time=? WHERE id=?",
    [
      formData.get("employee_id"),
      formData.get("start_time"),
      formData.get("end_time"),
      params.timesheetId,
    ]
  );

  return redirect("/timesheets");
};

export default function EditTimesheetPage() {
  const { timesheet, employees } = useLoaderData() as {
    timesheet: any;
    employees: any[];
  };

  return (
    <div>
      <h1>Edit Timesheet</h1>
      <TimesheetForm method="put" timesheet={timesheet} employees={employees} />
    </div>
  );
}
