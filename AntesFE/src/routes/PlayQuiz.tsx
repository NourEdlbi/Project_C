import { useState, useEffect } from 'react';
import { BASE_URL } from "../consts.ts";
import { useNavigate, useParams} from 'react-router-dom';
import "./Quiz.css";
import { QuizData, AnswerData, QuizResultData } from "../interfaces.tsx";
import {Sidebar } from "../Sidebar.tsx";
export default function Playquiz() {
    const navigate = useNavigate(); 
    const { quizID } = useParams();
    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionID: number]: string }>({});
    const [shuffledAnswers, setShuffledAnswers] = useState<{ [questionID: number]: string[] }>({});

    const shuffleArray = (array: string[]) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleAnswerSelection = (questionID: number, selectedValue: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionID]: selectedValue,
        }));
    };

    const submitQuiz = async () => {
        try {
            const answers = quiz?.questions.map((question) => ({
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

    useEffect(() => {
        const shuffledAnswersMap = {};
        quiz?.questions.forEach((question) => {
            const answersArray = [question.answer1, question.answer2, question.answer3, question.correctAnswer];
            shuffledAnswersMap[question.id] = shuffleArray(answersArray);
        });
        setShuffledAnswers(shuffledAnswersMap);
    }, [quiz]);
   
    useEffect(() => {
        console.log('Selected Answers:', selectedAnswers);
    }, [selectedAnswers]);

    window.onload = function exampleFunction() {
        console.log('Getting Quiz info...');
        getQuizQuestions();
    }

    const Quiz = {
        id: window.location.href.split("/").pop(), // pakt de id van de url
    };
     
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Quiz),
    };

    const getQuizQuestions = async () => {
        try {
            const response = await fetch(`${BASE_URL}/GetQuizQuestions`, options);
            if (response.ok) {
                const res = await response.json()
                setQuiz(res);
                console.log('');
            } else {
                console.log('Er is een fout opgetreden met de verbinding.');
            }
        } catch (error) {
            console.log('Er is een fout opgetreden met de verbinding.');
        }
    };

    const content = (
        quiz?.questions.map((question) => {
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
                <h1> {quiz?.name}</h1>
            </div>
            <div>
                <p>{quiz?.description}</p>
            </div>


            <div className="quizzes">
                <form>
                    {content}
                    <button type="submit" onClick={() => navigate('/Quizzes')}> submit quiz</button>
                </form>
            </div>
        </div>

    );
}

