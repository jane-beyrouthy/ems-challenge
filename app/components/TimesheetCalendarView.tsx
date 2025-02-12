import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css"; // Import default theme

// Function to format datetime to "YYYY-MM-DD HH:mm"
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export default function TimesheetCalendarView({
  timesheets,
}: {
  timesheets: any[];
}) {
  // Initialize Events Service Plugin
  const eventsService = useState(() => createEventsServicePlugin())[0];

  // Convert timesheets data into Schedule-X event format
  const events = timesheets.map((timesheet) => ({
    id: timesheet.id.toString(),
    title: timesheet.full_name,
    start: formatDateTime(timesheet.start_time), // Converts to "YYYY-MM-DD HH:mm"
    end: formatDateTime(timesheet.end_time), // Converts to "YYYY-MM-DD HH:mm"
  }));

  // Initialize Calendar App
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [eventsService],
  });

  // Load Events on Component Mount
  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Timesheet Calendar View</h2>
      {/* Custom Wrapper to apply styles */}
      <div className="sx-react-calendar-wrapper">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}
