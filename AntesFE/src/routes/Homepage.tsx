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
      const [posts, setPosts] = useState([]);
    function navigateToQuiz(id) { //checken of admin of user en dan navigate to one or another 
        const route = `/Quizzes/${id}`
        navigate(route);
    }
    useEffect(() => {
        fetch(`${BASE_URL}/Getagenda`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers if needed
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
                        description: item.description,
                    };
                });
                setEvents(mappedEvents);
            })
            .catch(error => {
                console.error('Error fetching agenda items:', error);
            });
    }, []);
    useEffect(() => {
        fetch(`${BASE_URL}/GetForumPosts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);
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
    const handlePostClick = (postId) => {
        navigate(`/Sidebar/userForum/${postId}`);
    };
    return (
        <div className='container'>

            <div className="posts">
                <h1>Posts</h1>
            </div >

            <div className="forum_posts_home">
                {posts.map(post => (
                    <div className='post'>
                        <div key={post.id}>
                            <p>Geplaatst door: {post.forumPosterName}</p>
                            <p>Post datum/tijd: {new Date(post.postTime).toLocaleString()}</p>
                            <h1 onClick={() => handlePostClick(post.id)}>{post.name}</h1>

                        </div>
                    </div>
                ))}
            </div>
            <div className='agenda-name'>
            <h1>Agenda</h1>
            </div>
            <div className='agenda'>
                
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