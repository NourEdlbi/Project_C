import "./UserQuiz.css";
import { useNavigate } from 'react-router-dom';

export default function Uquiz() {
    const navigate = useNavigate();
    const getquizzes = [
        { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
        { id: 2, title: 'Installation', content: 'You can install React from npm.' }
    ];

    const quizzes = getquizzes.map((quiz) =>
        <div key={quiz.id}>
            <button onClick={() => openQuiz(quiz.id)} className="quizbanner"> {quiz.title} </button>
            <div id={quiz.id.toString()} className="quizdescription">
                <p>{quiz.content}</p>

                <button onClick={() => navigateToQuiz(quiz.id)} className="Gotoquizbutton">
                    Make Quiz
                </button>
            </div>
        </div>
    );

    function openQuiz(id) {
        const x = document.getElementById(id) as HTMLElement;
        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }

    }

    function navigateToQuiz(id) {
        const route = "/userSidebar/Quizzes/" + { id };
        navigate(route);
    }

    return (
        <div>
            <div className="titel">
                <h1> Quiz</h1>
            </div>
            <div className="quizzes">
                {quizzes}
            </div>
        </div>
    )
}