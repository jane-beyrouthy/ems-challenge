import { useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";
import EmployeeListView from "~/components/EmployeeListView";

export async function loader() {
  const db = await getDB();
  const employees = await db.all(
    "SELECT id, full_name, email, phone, job_title, department FROM employees;"
  );
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData() as { employees: any[] };
  return (
    <div>
      <EmployeeListView employees={employees} />
    </div>
  );
}
