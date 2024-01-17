import "../Quiz.css";
import { useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../consts.ts";
import {QuizData, userinfoInterface } from "../../interfaces.tsx"

export default function Quiz() {

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
                {deletequizbutton(quiz.id)}
            </div>
        );
    });

    const addquizbutton = () => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo: userinfoInterface = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        console.log("ik kom hier sws")
        if (userInfo.admin == true) {
            console.log("ik kom hier")
            return (
                <button className="Gotoquizbutton" onClick={() => navigateAddquiz()}> Quiz toevoegen</button>
            )
        }
    }
    function deletequizbutton(id:number){
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo: userinfoInterface = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (userInfo.admin == true) {
            return (
                <button onClick={() => Deletequiz(id)} className="Gotoquizbutton"> verwijder quiz</button>
            )
        }
    }
    function navigateToQuiz(id:number) {
        const route = `/Sidebar/Quizzes/${id}`
        navigate(route);
    }

    function navigateAddquiz() {
        const route = `/Sidebar/Quizzes/MakeQuiz`
        navigate(route);
    }
    async function Deletequiz(quizid:number) {
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

        await fetch(`${BASE_URL}/DeleteQuiz`, options).then((res) => console.log(res)).catch((res) => console.log(res));
        location.reload();
    }

    return (
        <div>
            <div className="titel">
                <h1> Quiz</h1>
            </div>

            <div className="quiznavbar">
                {addquizbutton()}
            </div>

            <div className="quizPage">
                <div className="quizzes">
                    {quizzes}
                </div>
            </div>
        </div>
    )
}
