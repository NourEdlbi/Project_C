import "../Quiz.css";
import { useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../consts.ts";
import {QuizData, userinfoInterface } from "../../interfaces.tsx"

export default function Uquizzes() {
    const navigate = useNavigate();
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo: userinfoInterface = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (userInfo.admin == true) {
            see("admin")
        }
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
                    Maak Quiz
                </button>
            </div>
        );
      });

    function navigateToQuiz(id) {
        const route = `/Sidebar/Quizzes/${id}`
        navigate(route);
    }

    function navigateAddquiz() {
        const route = `/Sidebar/Quizzes/MakeQuiz`
        navigate(route);
    }

    function see(id) {
        const x = document.getElementById(id) as HTMLElement;
        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }

    return (
        <div className="quizPage">

            <div className="titel">
                <h1> Quiz</h1>
                <button id="admin" style={{ display: "none" }} onClick={() => navigateAddquiz()}></button>
            </div>
           
            <div className="quizzes">
                {quizzes}
            </div>

        </div>
    )
}
