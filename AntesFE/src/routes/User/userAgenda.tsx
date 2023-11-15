import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

export default function userAgenda() {

    const [events, setEvents] = useState([
    {
        id: 1,
        title: 'Event 1',
        start: new Date(2023, 9, 10, 10, 0),
        end: new Date(2023, 9, 10, 12, 0),
    },
    // ... (existing events)
    ]);

    const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    start: new Date(),
    end: new Date(),
    });

    const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
        ...newEvent,
        [name]: name === 'start' || name === 'end' ? new Date(value) : value,
    });
    };

    const addEvent = () => {
    setNewEvent({ ...newEvent, id: events.length + 1 });
    setEvents([...events, newEvent]);
    };

    const exportEventsToJSON = () => {
    const data = JSON.stringify(events, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.json';
    a.click();
    window.URL.revokeObjectURL(url);
    };

    const werk = () => {

        axios.get('https://localhost:7109/Getagenda/11', {
        params: {
            ID: 12345
        }
    })
        .then(function (response) {
            console.log(response);
        })
    }
    

    


  return (
    <div>
      <h1>AGENDA</h1>
      <h1>Add Event</h1>
      <form>
        <input type="text" name="title" value={newEvent.title} onChange={handleEventChange} placeholder="Event Title" />
        <input type="datetime-local" name="start" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={handleEventChange} />
        <input type="datetime-local" name="end" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={handleEventChange} />
        <button type="button" onClick={addEvent}>Add Event</button>
      </form>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
          />
          
          <button onClick={werk}>Export to </button>
          <button onClick={werk}> test</button>
    </div>
  );
}
