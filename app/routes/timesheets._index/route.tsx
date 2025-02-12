import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import TimesheetTableView from "~/components/TimesheetTableView";
import TimesheetCalendarView from "~/components/TimesheetCalendarView";

export async function loader() {
  const db = await getDB();
  const timesheets = await db.all(`
    SELECT timesheets.id, timesheets.start_time, timesheets.end_time, 
           employees.full_name 
    FROM timesheets 
    JOIN employees ON timesheets.employee_id = employees.id
  `);
  return { timesheets };
}

export default function TimesheetsPage() {
  const { timesheets } = useLoaderData() as { timesheets: any[] };
  const [view, setView] = useState<"table" | "calendar">("table");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Timesheets</h2>

      {/* Toggle Buttons */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            view === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("calendar")}
        >
          Calendar View
        </button>
      </div>

      {/* Conditional Rendering */}
      {view === "table" ? (
        <TimesheetTableView timesheets={timesheets} />
      ) : (
        <TimesheetCalendarView timesheets={timesheets} />
      )}
    </div>
  );
}
