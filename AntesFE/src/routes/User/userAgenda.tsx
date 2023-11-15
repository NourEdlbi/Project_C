/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
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
          
          {/* <button onClick={werk}>Export to </button> */}
          <button onClick={werk}> test</button>
        
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
