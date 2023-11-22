import "../Quiz.css";
import { useNavigate } from 'react-router-dom';
export default function Aquiz() {
    // quizzes ophalen van database

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
    const Makequiz = (e) => {
       navigate("/userSidebar/Quizzes/MakeQuiz")
    }

    function navigateToQuiz(id) {
        const route = "/userSidebar/Quizzes/" + { id };
        navigate("/userSidebar/Quizzes/1");
    }

    return (
        <div>
        <h1>Quizzes</h1>
            <div className="titel">
                <h1> Quiz</h1>
            </div>
            <div className="quizzes">
                {quizzes}
            </div>

            <button className="Gotoquizbutton">Delete a quiz</button>
            <button className="Gotoquizbutton" onClick={Makequiz} >Add a quiz</button>
        </div>
    )
}
