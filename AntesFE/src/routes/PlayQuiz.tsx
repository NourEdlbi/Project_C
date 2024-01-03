import { useState, useEffect } from 'react';
import { BASE_URL } from "../consts.ts";
import { useNavigate } from 'react-router-dom';

export default function Playquiz() {
    const navigate = useNavigate(); 

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
        id?: number;
        makerID?: number;
        name: string;
        description: string;
        questions: QuestionData[];
    }
    
    const [quiz, setQuiz] = useState<QuizData>();
    const [questionList, setQuestionList] = useState<QuestionData[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getQuizQuestions();
    }, []);

    const Quiz = {
        id: window.location.href.split("/").pop(), // id moet van url komen
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
                const questions = JSON.parse(await response.json());
                const Quiz = questions.Quiz;
                setQuestionList(questions.Questions)
                setQuiz(Quiz);

            } else {
                setErrorMessage('Er is een fout opgetreden met de verbinding.');
            }
        } catch (error) {
            setErrorMessage('Er is een fout opgetreden met de verbinding.');
        }
    };

    const questions = questionList.map((question) => {
        return (
            <div key={question.id} className="quizBox">
                <p>{question.answer1}</p>
                <h2>{question.answer2}</h2>
                <h2>{question.answer3}</h2>
                <p>{question.text}</p>
            </div>
        );
    });

    const [quizData, setQuizData] = useState<QuizData>({
        id: 0,
        makerID: 0,
        name: '',
        description: '',
        questions: [{
            id: 0,
            quizID: 0,
            text: '',
            answer1: '',
            answer2: '',
            answer3: '',
            correctAnswer: '',
        }],
    });

    return (
        <div className='newQuiz'>
            {questions }
           test
        </div>

    );
}
