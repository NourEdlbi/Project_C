import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../consts';

const localizer = momentLocalizer(moment);

export default function AdminAgenda() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAgenda = async (month) => {
            try {
                const response = await fetch(`${BASE_URL}/Getagenda/${month}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
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
            } catch (error) {
                console.error('Error fetching agenda items:', error);
            }
        };

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        fetchAgenda(currentMonth);
    }, []); // Empty dependency array to fetch data on component mount

    const navigate = useNavigate();

    const navigateAddAfspraak = () => {
        navigate('/adminSidebar/adminAgenda/AddAgendaItem');
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
                />
                <button onClick={navigateAddAfspraak}> Agendapunt toevoegen</button>
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
