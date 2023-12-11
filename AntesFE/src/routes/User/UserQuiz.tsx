/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

import { useParams } from "react-router-dom";
import "../Quiz.css";
import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../consts.ts";
import { useNavigate, } from 'react-router-dom';

interface QuestionData {
    id: number;
    quizID: number;
    questionText: string;
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

  interface AnswerData {
    answers: { questionID: number; value: string }[];
}
  interface QuizResultData {
    id: number;
    quizID: number;
    quizSubmitterID: number;
    answerID: number;
  }
  

export default function Uquiz() {
    const { quizID } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<{ Quiz: QuizData; Questions: QuestionData[] } | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionID: number]: string }>({});
    const [shuffledAnswers, setShuffledAnswers] = useState<{ [questionID: number]: string[] }>({});
    const [errorMessage, setErrorMessage] = useState('');

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    useEffect(() => {
        const shuffledAnswersMap = {};
        quizData?.Quiz.questions.forEach((question) => {
            const answersArray = [question.answer1, question.answer2, question.answer3, question.correctAnswer];
            shuffledAnswersMap[question.id] = shuffleArray(answersArray);
        });
        setShuffledAnswers(shuffledAnswersMap);
    }, [quizData]);

      useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/userSidebar/Quizzes/${quizID}`);
            if (response.ok) {
              const data = await response.json();
              console.log('Received data:', data);
              setQuizData({ Quiz: data.quiz, Questions: data.questions });
            } else {
              setErrorMessage('Er is een fout opgetreden.');
            }
          } catch (error) {
            setErrorMessage('Er is een fout opgetreden.');
          }
        };
    
        getData();
      }, [quizID]);



      const handleAnswerSelection = (questionID: number, selectedValue: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionID]: selectedValue,
        }));
    };

    useEffect(() => {
        console.log('Selected Answers:', selectedAnswers);
    }, [selectedAnswers]);


    const submitQuiz = async () => {
        try {
            const answers = quizData?.Questions.map((question) => ({
                questionID: question.id,
                value: selectedAnswers[question.id] || '',
            }));

            const response = await fetch(`${BASE_URL}/userSidebar/Quizzes/${quizID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }

    };

    const content = (
        quizData?.Quiz.questions.map((question) => {
            const questionAnswers = shuffledAnswers[question.id] || []; // Use default empty array if shuffledAnswers[question.id] is undefined
            return (
                <div className="questionBox" key={question.id}>
                    <h2>{question.questionText}</h2>
                    <div id={question.id.toString()} className="answers">
                        {questionAnswers.map((shuffledAnswer, index) => (
                            <div key={index} className="answersOnly">
                                <input
                                    name={question.id.toString()}
                                    type="radio"
                                    value={shuffledAnswer}
                                    onChange={() => handleAnswerSelection(question.id, shuffledAnswer)}
                                />
                                 <label className="answer">{shuffledAnswer}</label> <br />
                            </div>
                        ))}
                    </div>
                </div>
            );
        })
    );

    return (
        <div className="quizContent">
            <div className="titel">
                <h1> {quizData?.Quiz.name}</h1>
            </div>
            <div>
                <p>{quizData?.Quiz.description}</p>
            </div>
            

            <div className="quizzes">
                <form>
                    {content}
                    <button type="submit" onClick={() => navigate('/userSidebar/Quizzes')}> submit quiz</button>
                </form>
            </div>
        </div>
    )
}
