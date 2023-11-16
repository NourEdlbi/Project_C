/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../User/userAgenda.css';

const localizer = momentLocalizer(moment);

export default function UserAgenda() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Make sure to use the same key as in AdminAgenda
    const storedEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
    const parsedEvents = storedEvents.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    setEvents(parsedEvents);
  }, []);

  // Function to handle event click
  const handleEventClick = (event) => {
    // Display event details. You can replace this with a modal or custom popup
    alert(`Title: ${event.title}\nDescription: ${event.description}\nStart: ${event.start}\nEnd: ${event.end}`);
  };

  return (
    <div className='agenda_pagina'>
      <div className="titel">
        <h1>Agenda</h1>
      </div>
      <div className='calendar'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 570, width: 850, backgroundColor: '#F8EEF0', border: '1px', borderStyle: 'solid', borderColor: '#A2102C' }}
          onSelectEvent={handleEventClick} // Added click handler
        />
      </div>

      <div className='events'>
        <h1>Events</h1>
        <ul>
          {events.map((event, index) => (
            <li key={event.id || index}>{event.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
