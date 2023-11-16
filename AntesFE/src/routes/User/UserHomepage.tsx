/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import '../User/UserHomepage.css';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Uhome() {

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
        <div className='container'>
            <div className="titel">
                <h1 >Home</h1>
            </div>

            <div className="posts">
                <h1>Posts</h1>
            </div >

            <div className="forum_posts" >
                <div className='fake_post'>
                    <div className='picture'>
                        .
                    </div>
                    <div className='name'>
                        Wiktoria C.
                    </div>
                    <div className='date'>
                        13-11-2023
                    </div>
                    <div className='content1'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                    <div className='content2'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                </div>

                <div className='fake_post'>
                    <div className='picture'>
                        .
                    </div>
                    <div className='name'>
                        Appie A.
                    </div>
                    <div className='date'>
                        14-11-2023
                    </div>
                    <div className='content1'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                    <div className='content2'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                </div>

                <div className='fake_post'>
                    <div className='picture'>
                        .
                    </div>
                    <div className='name'>
                        Nour E.
                    </div>
                    <div className='date'>
                        14-11-2023
                    </div>
                    <div className='content1'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                    <div className='content2'>
                        Dit is de forum post content. Hier komt een text in. De content van de post is er nog niet
                    </div>
                </div>

            </div>
            
            <div className='agenda'>
                <h1>Agenda</h1>
                <p>.</p>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '40vh', width: '112%', backgroundColor: '#F8EEF0', margin: -12}}
                />
                </div>
            
            <div className='quizzen'>
                <h1>Quiz</h1>
                Maak verschillende quizzen om je kennis te testen!
            </div>
        </div>
    );
}