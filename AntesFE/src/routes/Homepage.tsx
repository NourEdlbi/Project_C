import { QuizData} from  '../interfaces.tsx'
import './Homepage.css';
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BASE_URL} from  "../consts.ts";

const localizer = momentLocalizer(moment);

export default function HomePage() {

    const navigate = useNavigate();
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [events, setEvents] = useState([
        {
          id: 1,
          title: 'Event 1',
          start: new Date(2023, 9, 10, 10, 0),
          end: new Date(2023, 9, 10, 12, 0),
        },
        // ... (existing events)
      ]);

    function navigateToQuiz(id) { //checken of admin of user en dan navigate to one or another 
        const route = `/Quizzes/${id}`
        navigate(route);
    }

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/DisplayQuizzes`);
                if (response.ok) {
                    const quizzesL = await response.json();
                    console.log(quizzesL);
                    setQuizList(quizzesL);
                } else {
                    setErrorMessage('Er is een fout opgetreden met de verbinding.');
                }
            } catch (error) {
                setErrorMessage('Er is een fout opgetreden met de verbinding.');
            }
        };
        getQuizzes();
    }, []);

    const quizzes = quizList.map((quiz) => {
        return (
            <div key={quiz.id} className="quizBox">
                <h2>{quiz.name}</h2>
                <p>{quiz.description}</p>
                <button onClick={() => navigateToQuiz(quiz.id)} className="Gotoquizbutton">
                    Quiz openen
                </button>
            </div>
        );
    });

    return (
        <div className='container'>

            <div className="posts">
                <h1>Posts</h1>
            </div >

            <div className="forum_posts" >
                Hier komen forum posts die wij nog niet hebben.
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
            
            <div className='quizzen'> {/* css styling is nodig voor de homepage*/}
                <h2> Maak een quiz!</h2>
                <div className="quizzes">
                    {quizzes}
                </div>
            </div>
        </div>
    );
}