import { useState, useEffect } from 'react';
import { BASE_URL } from "../consts.ts";
import { useNavigate, useParams} from 'react-router-dom';
import "./Quiz.css";
import { QuizData, AnswerData, QuizResultData, userinfoInterface } from "../interfaces.tsx";
export default function Playquiz() {
    const navigate = useNavigate(); 
    const [quiz, setQuiz] = useState<QuizData>();
    const [selectedAnswers, setSelectedAnswers] = useState < AnswerData[]>([]);
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
        const answerdata: AnswerData = { value: selectedValue, questionID: questionID }
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            answerdata
        }));
        console.log(selectedAnswers);
    };

    const submitQuiz = async () => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo:userinfoInterface = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        const Quizresults:QuizResultData = {
            quizSubmitterID: userInfo.id,
            quizID: quiz.id,
            answers: selectedAnswers
        };
        try {
            const response = await fetch(`${BASE_URL}/SubmitQuiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Quizresults),
                
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

    const Quiz = useParams();
     
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
                console.log(res);
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
                    <button type="submit" onClick={() => submitQuiz()}> submit quiz</button>
                </form>
            </div>
        </div>
    );
}

