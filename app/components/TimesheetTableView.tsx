import { useNavigate } from "react-router";

export default function TimesheetTableView({
  timesheets,
}: {
  timesheets: any[];
}) {
  const navigate = useNavigate();

  const handleRowClick = (timesheetId: string) => {
    navigate(`/timesheets/${timesheetId}`);
  };

  return (
    <div className="timesheet-table-container">
      <h2 className="table-title">Table View</h2>

      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr
              key={timesheet.id}
              onClick={() => handleRowClick(timesheet.id)}
              className="timesheet-row"
            >
              <td>{timesheet.full_name}</td>
              <td>{new Date(timesheet.start_time).toLocaleString()}</td>
              <td>{new Date(timesheet.end_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
