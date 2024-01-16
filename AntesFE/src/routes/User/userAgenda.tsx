import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';


const localizer = momentLocalizer(moment);

export default function userAgenda() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'test',
      start: new Date(2023, 10, 11, 10, 0),
      end: new Date(2023, 10, 11, 12, 0),
    },
    // ... (existing events)
  ]);

  //   const [newEvent, setNewEvent] = useState({
  //     id: null,
  //     title: '',
  //     start: new Date(),
  //     end: new Date(),
  //   });

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const newCurrentMonth = currentMonth.toString();

    fetch(`${BASE_URL}/Getagenda/${currentMonth}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'month': newCurrentMonth
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const mappedEvents = data.map((item, index) => {
          const startDate = new Date(item.date + 'T' + item.begintime);
          const endDate = new Date(item.date + 'T' + item.endtime);
          return {
            id: index + 1,
            title: item.title,
            start: startDate,
            end: endDate,
          };
        });
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error('Error fetching agenda items:', error);
      });
  }, []);




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
        />
      </div>
      <div className='events'>
        <h1 style={{ padding: 2, position: 'relative', right: '70%' }}>Events</h1>
        <ul>
          {/* Render the list of events here if needed */}
        </ul>
      </div>
    </div>
  );
}
