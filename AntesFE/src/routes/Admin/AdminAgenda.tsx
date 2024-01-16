import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Import the Modal component
import { BASE_URL } from '../../consts';

const localizer = momentLocalizer(moment);

export default function AdminAgenda() {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'test',
            start: new Date(2023, 10, 11, 10, 0),
            end: new Date(2023, 10, 11, 12, 0),
        },
        // ... (existing events)
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
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
                    console.log(item);
                    const startDate = new Date(item.date + 'T' + item.begintime);
                    const endDate = new Date(item.date + 'T' + item.endtime);
                    return {
                        id: index + 1,
                        title: item.title,
                        start: startDate,
                        end: endDate,
                        description: item.description,
                    };
                });
                setEvents(mappedEvents);
            })
            .catch(error => {
                console.error('Error fetching agenda items:', error);
            });
    }, []);

    const navigateAddAfspraak = () => {
        navigate('AddAgendaItem');
    };

    const handleEventClick = event => {
        setSelectedEvent(event);
        // Additional logic or fetching details if needed
        // You can fetch additional details here based on the event.id or other properties
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className='agenda_pagina'>
            <div className='calendar'>
                <div className="titel" style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '-350px' }}>
                    <h1>Agenda</h1>
                </div>
                <button onClick={navigateAddAfspraak} style={{ marginLeft: '-350px' }}>Agendapunt toevoegen</button>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick} // Add the event click handler
                    style={{ height: 570, width: 850, backgroundColor: '#F8EEF0', border: '1px', borderStyle: 'solid', borderColor: '#A2102C' }}
                />
            </div>

            <Modal
                isOpen={selectedEvent !== null}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={true}  // Allow closing the modal by clicking outside
                contentLabel="Event Details"
                style={{
                    content: {
                        left: '81%', // Keep the modal centered horizontally
                        right: 'auto', // Reset the right property
                        transform: 'translateX(-50%)', // Center the modal horizontally
                    },
                }}
            >
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p>Datum en tijd</p>
                        <p>{selectedEvent.start.toString()}</p>

                        {/* <p>Beschrijving: {selectedEvent.description}</p> */}
                        {/* Add more details if needed */}

                    </div>
                )}
            </Modal>


        </div>
    );
}
