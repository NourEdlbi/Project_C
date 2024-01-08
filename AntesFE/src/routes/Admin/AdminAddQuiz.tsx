import { useState } from 'react';
import { BASE_URL } from "../../consts.ts";
import './AdminAddQuiz.css';
import { useNavigate } from 'react-router-dom';
import { QuizData } from '../../interfaces.tsx'

export default function Addquiz() {
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

    const addQuestion = () => {
    setQuizData((prevData) => ({
        ...prevData,
        questions: [
        ...prevData.questions,
        {
            id: 0, 
            quizID: 0,
            text: '',
            answer1: '',
            answer2: '',
            answer3: '',
            correctAnswer: '',
        },
        ],
        }));
    };

    const handleQuestionChange = (index: number, value: string) => {
        setQuizData((prevData) => {
            const newQuestions = [...prevData.questions];
            newQuestions[index].text = value;
            return {
            ...prevData,
            questions: newQuestions,
            };
        });
    };
  
    const handleAnswerChange = (questionIndex: number, answerField: string, value: string) => {
        setQuizData((prevData) => {
            const newQuestions = [...prevData.questions];
            newQuestions[questionIndex][answerField] = value;
            return {
            ...prevData,
            questions: newQuestions,
            };
        });
    };
  
    const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
        setQuizData((prevData) => {
            const newQuestions = [...prevData.questions];
            newQuestions[questionIndex].correctAnswer = value;
            return {
            ...prevData,
            questions: newQuestions,
            };
        });
    };

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

    const submitQuiz = () => {
        fetch(`${BASE_URL}/NewQuiz`, options).then((res) => console.log(res)).catch((res) => console.log(res));
        navigate("/adminSidebar/adminQuiz")
        location.reload();
    } 

return (
    <div className='newQuiz'>
        <div className='titel'>
            <h1>Quiz toevoegen</h1>
        </div>

        <h2>Nieuwe quiz </h2>

        <div className='quizBasics'>
            <form>
                <label>
                Quiz naam:
                <input type="text" value={quizData.name} onChange={(e) => setQuizData({ ...quizData, name: e.target.value })} />
                </label>
                <br />

                <label>
                Omschrijving:
                <textarea value={quizData.description} onChange={(e) => setQuizData({ ...quizData, description: e.target.value })} />
                </label>
            </form>
        </div>

        <h2>Vragen </h2>
        <div className='instructions'>
            Vul een vraag in met drie foute antwoorden en één correcte antwoord. Druk op "Vraag toevoegen" om een nieuwe vraag toe te voegen.
        </div>

        <div className='quizData'>
            <form>
            {quizData.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="questions">
                <label>
                Vraag:
                <input
                    className='questionInput'
                    type="text"
                    value={q.text}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                />
                </label>

                <label>
                Antwoord 1:
                <input
                    className="answerInput"
                    type="text"
                    value={q.answer1}
                    onChange={(e) => handleAnswerChange(questionIndex, 'answer1', e.target.value)}
                />
                </label>
                <label>
                Antwoord 2:
                <input
                    className="answerInput"
                    type="text"
                    value={q.answer2}
                    onChange={(e) => handleAnswerChange(questionIndex, 'answer2', e.target.value)}
                />
                </label>
                <label>
                Antwoord 3:
               
                <input
                    className="answerInput"
                    type="text"
                    value={q.answer3}
                    onChange={(e) => handleAnswerChange(questionIndex, 'answer3', e.target.value)}
                />
                </label>

                <label>
                Juiste antwoord:
                <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
                />
                </label>
                </div>))}
            </form>
        </div>

        <div>
            <button type="button" onClick={addQuestion}>
            Vraag toevoegen
            </button>
            <button type="button" onClick={() =>submitQuiz()}>
            Quiz Aanmaken
            </button>
        </div>
    </div>
    );
}
