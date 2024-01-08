 import "../Quiz.css";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../consts.ts";
import { useState, useEffect } from 'react';

interface QuestionData {
    id?: number;
    quizID?: number;
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    correctAnswer: string;
}
  
interface QuizData {
    id: number;
    makerID?: number;
    name: string;
    description: string;
    questions: QuestionData[];
}

export default function Aquiz() {

    const navigate = useNavigate();
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

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
                <button onClick={ () => Deletequiz(quiz.id)} className="Gotoquizbutton"> verwijder quiz</button>
            </div>
        );
    });

    function navigateToQuiz(id) {
        const route = `/adminSidebar/Quizzes/${id}`
        navigate(route);
    }

    const Makequiz = (e) => {
        navigate("/adminSidebar/Quizzes/MakeQuiz")
    }

    function Deletequiz(quizid) {
        const Quiz = {
            id: quizid
        };

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Quiz),
        };

        fetch(`${BASE_URL}/DeleteQuiz`, options).then((res) => console.log(res)).catch((res) => console.log(res));
        location.reload();
    }

    return (
        <div>
            <div className="titel">
                <h1> Quiz</h1>
            </div>

            <div className="quiznavbar">
                <button className="Gotoquizbutton" onClick= {Makequiz}> Nieuwe quiz</button>
            </div>

            <div className="quizPage">
                <div className="quizzes">
                    {quizzes}
                </div>

            </div>
        </div>
    )
    // quizzes ophalen van database

    // const navigate = useNavigate();


    // const getquizzes = fetch(`${BASE_URL}/yourQuizListEndpoint`);

    // const quizzes = getquizzes.map((quiz) =>
    //     <div key={quiz.id}>
    //         <button onClick={() => openQuiz(quiz.id)} className="quizbanner"> {quiz.title} </button>
    //         <div id={quiz.id.toString()} className="quizdescription">
    //             <p>{quiz.content}</p>

    //             <button onClick={() => navigateToQuiz(quiz.id)} className="Gotoquizbutton">
    //                 Make Quiz
    //             </button>
    //         </div>
    //     </div>
    // );

    // function openQuiz(id) {
    //     const x = document.getElementById(id) as HTMLElement;
    //     if (x.style.display == "block") {
    //         x.style.display = "none";
    //     }
    //     else {
    //         x.style.display = "block";
    //     }

    // }


    // function navigateToQuiz(id) {
    //     const route = "/adminSidebar/Quizzes/" + { id };
    //     navigate("/adminSidebar/Quizzes/1");
    // }

    // return (
    //     <div>
    //     <h1>Quizzes</h1>
    //         <div className="titel">
    //             <h1> Quiz</h1>
    //         </div>
    //         <div className="quizzes">
    //             {quizzes}
    //         </div>

    //         <button className="Gotoquizbutton">Delete a quiz</button>
    //         <button className="Gotoquizbutton" onClick={Makequiz} >Add a quiz</button>
    //     </div>
    // )
}
