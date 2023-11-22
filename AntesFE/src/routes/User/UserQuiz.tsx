/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import "./UserQuiz.css";

const getquizzes = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];

const quizzes = getquizzes.map((quiz) =>
    <div key={quiz.id}>
        <button onClick={() => openQuiz(quiz.id)} className="quizbanner"> {quiz.title} </button>
        <div id={quiz.id.toString() } className="quizdescription">
            <p>{quiz.content}</p>

            <button className="Gotoquizbutton">
                Make Quiz
            </button>
        </div>
        
    </div>
);
function openQuiz(id) {
    const x = document.getElementById(id) as HTMLElement;
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }

}

export default function Uquiz() {
    return (
        <div>
            <div className="titel">
                <h1> Quiz</h1>
            </div>
            <div className="quizzes">

                { quizzes}
                
            </div>
            
        </div>

    )
}