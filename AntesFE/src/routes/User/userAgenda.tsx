/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../User/userAgenda.css';

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

  return (
    <div>
      <div className="titel">
        <h1 >Agenda</h1>
      </div>
      {/* <h1>Add Event</h1>
      <form>
        <input type="text" name="title" value={newEvent.title} onChange={handleEventChange} placeholder="Event Title" />
        <input type="datetime-local" name="start" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={handleEventChange} />
        <input type="datetime-local" name="end" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={handleEventChange} />
        <button type="button" onClick={addEvent}>Add Event</button>
      </form> */}
      <div className='calendar'>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, width: 950, backgroundColor: '#F8EEF0', border: '1px', borderStyle: 'solid', borderColor: '#A2102C'}}
      />
      {/* <button className='export_button' onClick={exportEventsToJSON}>Export to JSON</button></div> */}
      </div>

      <div className='events'>
        <h1>Events</h1>
        <ul>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
        </ul>
      </div>

    </div>
  );
}
