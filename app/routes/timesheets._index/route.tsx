import { useLoaderData, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { timesheets } = useLoaderData() as { timesheets: any[] };
  const [view, setView] = useState<"table" | "calendar">("table");

  return (
    <div className="timesheets-page">
      {/* Toggle Buttons */}
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === "table" ? "active" : ""}`}
          onClick={() => setView("table")}
        >
          Table View
        </button>
        <button
          className={`toggle-button ${view === "calendar" ? "active" : ""}`}
          onClick={() => setView("calendar")}
        >
          Calendar View
        </button>
      </div>
      {/* Navigation Button */}
      <div className="add-timesheet-container">
        <button
          onClick={() => navigate("/timesheets/new")}
          className="add-timesheet-button"
        >
          Add New Timesheet
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
