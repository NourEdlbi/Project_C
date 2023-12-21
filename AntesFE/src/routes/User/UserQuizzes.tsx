/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import "../Quiz.css";
import { useNavigate, } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../consts.ts";
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

export default function Uquizzes() {
    const navigate = useNavigate();
    const [quizList, setQuizList] = useState<QuizData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const getQuizzes = async () => {
          try {
            const response = await fetch(`${BASE_URL}/userSidebar/Quizzes`);
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
        const route = `/userSidebar/Quizzes/${id}`
        navigate(route);
    }

    return (
        <div className="quizPage">

            <div className="titel">
                <h1> Quiz</h1>
            </div>
            <div className="quizzes">
                {quizzes}
            </div>

        </div>
    )
}
