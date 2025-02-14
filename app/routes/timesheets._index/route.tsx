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
  const [isCalendarView, setIsCalendarView] = useState(false);

  return (
    <div className="timesheets-page">
      {/* Toggle Switch */}
      <div className="toggle-switch-container">
        <span className={!isCalendarView ? "active-label" : ""}>
          Table View
        </span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isCalendarView}
            onChange={() => setIsCalendarView(!isCalendarView)}
          />
          <span className="slider"></span>
        </label>
        <span className={isCalendarView ? "active-label" : ""}>
          Calendar View
        </span>
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
      {isCalendarView ? (
        <TimesheetCalendarView timesheets={timesheets} />
      ) : (
        <TimesheetTableView timesheets={timesheets} />
      )}
    </div>
  );
}
