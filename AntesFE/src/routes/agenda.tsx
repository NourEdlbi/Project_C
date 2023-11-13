
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Agenda() {
  // event aanmaken alleen frontend
  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 9, 10, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
      end: new Date(2023, 9, 10, 12, 0),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 9, 12, 14, 0),
      end: new Date(2023, 9, 12, 16, 0),
    },
    {
      id: 3,
      title: 'Nederland vs Frankrijk',
      start: new Date(2023, 9, 13, 20, 45),
      end: new Date(2023, 9, 13, 22, 0),
    },
  ];

  return (
    <div>
      <h1>AGENDA</h1>
      <h1></h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }} // Set the calendar height as needed
      />
    </div>
  );
}
