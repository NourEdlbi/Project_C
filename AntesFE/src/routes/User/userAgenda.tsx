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


  return (
    <div className='agenda_pagina'>
      <div className="titel">
        <h1 >Agenda</h1>
      </div>
      <div className='calendar'>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 570, width: 850, backgroundColor: '#F8EEF0', border: '1px', borderStyle: 'solid', borderColor: '#A2102C'}}
      />
      </div>

      <div className='events'>
        <h1 style={{padding: 2, position: 'relative', right: '70%'}}>Events</h1>
        <ul>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
        </ul>
      </div>

    </div>
  );
}
