/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Admin/adminAgenda.css';

const localizer = momentLocalizer(moment);

export default function AdminAgenda() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
    });

    useEffect(() => {
        // Retrieve events from localStorage on component mount
        const storedEvents = JSON.parse(localStorage.getItem('adminEvents')) || [];
        setEvents(storedEvents);
    }, []);

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: name === 'start' || name === 'end' ? new Date(value) : value,
        });
    };

    const addEvent = () => {
        // Create a copy of the existing events and add the new event
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);

        // Store the updated events in localStorage
        localStorage.setItem('adminEvents', JSON.stringify(updatedEvents));

        // Clear the newEvent state for the next entry
        setNewEvent({
            title: '',
            description: '',
            start: '',
            end: '',
        });
    };

    return (
        <div className='admin_agenda'>
            <div className="titel">
                <h1>Admin Agenda</h1>
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

            <div className='admin_events'>
                <h1 style={{ padding: 2, position: 'relative', right: '70%' }}>Admin Events</h1>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>{event.title}</li>
                    ))}
                </ul>
            </div>

            <div className='add_event'>
                    <h1>Add Event</h1>
                    <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleEventChange} />
                    <input type="text" name="description" placeholder="Description" value={newEvent.description} onChange={handleEventChange} />
                    <input type="datetime-local" name="start" value={newEvent.start} onChange={handleEventChange} />
                    <input type="datetime-local" name="end" value={newEvent.end} onChange={handleEventChange} />
                <div className='add_button'>
                    <button onClick={addEvent}>Add</button>
                </div>
            </div>
        </div>
    );
}
