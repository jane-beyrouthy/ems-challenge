import { Link } from "react-router";

export default function TimesheetTableView({
  timesheets,
}: {
  timesheets: any[];
}) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Timesheets List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="text-center border">
              <td className="border p-2">{timesheet.full_name}</td>
              <td className="border p-2">
                {new Date(timesheet.start_time).toLocaleString()}
              </td>
              <td className="border p-2">
                {new Date(timesheet.end_time).toLocaleString()}
              </td>
              <td className="border p-2">
                <Link
                  to={`/timesheets/${timesheet.id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation Button */}
      <div className="mt-4">
        <Link
          to="/timesheets/new"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Timesheet
        </Link>
      </div>
    </div>
  );
}
