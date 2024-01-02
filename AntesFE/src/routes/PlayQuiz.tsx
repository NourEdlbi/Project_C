import { useState } from 'react';
import { BASE_URL } from "../consts.ts";
import { useNavigate } from 'react-router-dom';

export default function Playquiz() {
    const navigate = useNavigate();

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

    const updateQuiz = {
        id: quizData.id,
        makerID: quizData.makerID,
        name: quizData.name,
        description: quizData.description,
        questions: quizData.questions, //krijgen we hier alle questions?
    };


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateQuiz),
    };

    function getQuizquestions(){
        fetch(`${BASE_URL}/adminSidebar/Quizzes/MakeQuiz`, options).then((res) => console.log(res)).catch((res) => console.log(res));
        navigate("/adminSidebar/adminQuiz")
        location.reload();
    }

    return (
        <div className='newQuiz'>
           test
        </div>

    );
}
