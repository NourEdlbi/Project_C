/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
// import "../Quiz.css";
// import { useNavigate } from 'react-router-dom';
// export default function Addquiz() {
//     // quizzes ophalen van database

//     const navigate = useNavigate();
//     const questions: { id: string, question: string, ans1: string, ans2: string, ans3: string, ans4: string, correct: string }[] = [];

//     const quiz = questions.map((question) => {
//         if (questions.length > 1) {

//             return(
//                 < div key = { question.id } >
//                 <p>{question.question}</p>
//                 <div id={question.id.toString()} className="answers">

//                     <input name={question.id.toString()} type="radio" value={question.ans1}></input>{question.ans1} <br></br>
//                     <input name={question.id.toString()} type="radio" value={question.ans2}></input>{question.ans2} <br></br>
//                     <input name={question.id.toString()} type="radio" value={question.ans3}></input>{question.ans3} <br></br>
//                     <input name={question.id.toString()} type="radio" value={question.ans4}></input>{question.ans4} <br></br>

//                 </div>
//             </div >
//             )
            
//         }
//         else {
//             return (
//             <div>
//                 <p>No questions yet</p>
//             </div>
//             )
            
//         }
//     });

//     function AddQuestion() {
//         const q = document.getElementById("q") as HTMLInputElement;
//         const a1 = document.getElementById("a1") as HTMLInputElement;
//         const a2 = document.getElementById("a2") as HTMLInputElement;
//         const a3 = document.getElementById("a3") as HTMLInputElement;
//         const a4 = document.getElementById("a4") as HTMLInputElement;
//         const q1 = document.getElementById("q") as HTMLInputElement;



//         questions.push({

//             id: questions.length.toString(),
//             question: q.value,
//             ans1: a1.value,
//             ans2: a2.value,
//             ans3: a3.value,
//             ans4: a4.value,
//             correct: ""
//         });

//     }

//     return (
//         <div>
//             <div>
//                 {quiz}
//             </div>

//             <div>
//                 <input id="q" className="Gotoquizbutton" placeholder="question"></input> <br></br>
//                A <input id="a1" className="Gotoquizbutton" placeholder="answer"></input>
//                B <input id="a2" className="Gotoquizbutton" placeholder="answer"></input> <br></br>
//                C <input id="a3" className="Gotoquizbutton" placeholder="answer"></input>
//                D <input id="a4" className="Gotoquizbutton" placeholder="answer"></input> <br></br>
//                 <button onClick={AddQuestion} className="Gotoquizbutton">add a question</button>
//             </div>
            
//         </div>
//     )
// }

import React, { useState } from 'react';
import { BASE_URL } from "../../consts.ts";
import './AdminAddQuiz.css';
import { useNavigate } from 'react-router-dom';

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
    fetch(`${BASE_URL}/adminSidebar/Quizzes/MakeQuiz`, options).then((res) => console.log(res)).catch((res) => console.log(res));
    navigate("/adminSidebar/adminQuiz")
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
      Vul een vraag in met drie fautieve antwoorden en één correcte antwoord. Druk op "Vraag toevoegen" om een nieuwe vraag toe te voegen.
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
          <br />

          <label>
            Antwoord 1:
            <br />
            <input
              className="answerInput"
              type="text"
              value={q.answer1}
              onChange={(e) => handleAnswerChange(questionIndex, 'answer1', e.target.value)}
            />
            </label>
            <label>
            Antwoord 2:
            <br />
            <input
              className="answerInput"
              type="text"
              value={q.answer2}
              onChange={(e) => handleAnswerChange(questionIndex, 'answer2', e.target.value)}
            />
            </label>
            <label>
            Antwoord 3:
            <br />
            <input
              className="answerInput"
              type="text"
              value={q.answer3}
              onChange={(e) => handleAnswerChange(questionIndex, 'answer3', e.target.value)}
            />
          </label>
          <br />

          <label>
            Juiste antwoord:
            <input
              type="text"
              value={q.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
            />
          </label>
          <br />
        </div>
      ))}


      
    </form>
  </div>
  <div>
      <button type="button" onClick={addQuestion}>
        Vraag toevoegen
      </button>
      <button type="button" onClick={submitQuiz}>
        Quiz Aanmaken
      </button>
  </div>
  </div>
    
);
}
