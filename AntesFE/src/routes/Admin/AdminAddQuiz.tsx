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

export default function Addquiz() {
  const [quizName, setQuizName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answers: [''], correctAnswer: '' }]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [''], correctAnswer: '' }]);
    setCorrectAnswers([...correctAnswers, '']);
  };

  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push('');
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[questionIndex] = value;
    setCorrectAnswers(newCorrectAnswers);
  };

//   const submitQuiz = async () => {
//     try {
//       const response = await fetch("http://localhost:5173/adminSidebar/Quizzes/MakeQuiz", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           quizName,
//           description,
//           questions,
//           correctAnswers,
//         }),
//       });

//       if (response.ok) {
//         console.log('Quiz added successfully');
//         // You can redirect or perform other actions upon successful quiz addition
//       } else {
//         console.error('Failed to add quiz');
//       }
//     } catch (error) {
//       console.error('Error adding quiz:', error);
//     }
//   };

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        // quizName,
        // description,
        quizName:"test",
        description:"33test",

      }),
};

const submitQuiz = () => {
    // fetch("http://localhost:5173/adminSidebar/Quizzes/MakeQuiz", options).then((res) => console.log(res)).catch((res) => console.log(res));
    fetch("http://localhost:5263/MakeQuiz", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // Handle the response data as needed
    })
    .catch((error) => console.error(error));
} 


  return (
    <div>
      <h2>Add Quiz</h2>
      <form>
        <label>
          Quiz Name:
          <input type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} />
        </label>
        <br />

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />

        {questions.map((q, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question:
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              />
            </label>
            <br />

            <label>
              Answers:
              {q.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => addAnswer(questionIndex)}>
                Add Answer
              </button>
            </label>
            <br />

            <label>
              Correct Answer:
              <select
                value={correctAnswers[questionIndex]}
                onChange={(e) => handleCorrectAnswerChange(questionIndex, e.target.value)}
              >
                {q.answers.map((answer, answerIndex) => (
                  <option key={answerIndex} value={answer}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <br />
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <br />

        <button type="button" onClick={submitQuiz}>
          Submit Quiz
        </button>
      </form>
    </div>
  );
}
