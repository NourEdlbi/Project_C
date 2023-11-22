import "../Quiz.css";
import { useParams } from 'react-router-dom';

export default function Uquiz() {
    const { id } = useParams();

    const getquizquestions = [
        { id: 1, question: 'Wat gaan we doen met de neppiraten?', ans1: 'schiet hun schip maar vol met gaten!', ans2: 'Gooi ze overboord!', ans3: 'Ik heb geen idee waar je het over hebt joh', ans4: 'idk geef ze socialisme' },
        { id: 2, question: 'Hello World', ans1: 'Welcome to learning React!', ans2: 'Welcome to learning React!', ans3: 'Welcome to learning React!', ans4: 'Welcome to learning React!' }
    ];

    const quiz = getquizquestions.map((question) =>
        
        <div key={question.id}>
            <p>{question.question }</p>
            <div id={question.id.toString()} className="answers">
                
                <input name={question.id.toString()}  type="radio" value={question.ans1}></input>{question.ans1} <br></br>
                <input name={question.id.toString()}  type="radio" value={question.ans2}></input>{question.ans2} <br></br>
                <input name={question.id.toString()} type="radio" value={question.ans3}></input>{question.ans3} <br></br>
                <input name={question.id.toString()}  type="radio" value={question.ans4}></input>{question.ans4} <br></br>
                
            </div>
        </div>
    );

    return (
        <div>
            <div className="titel">
                <h1> Quiz</h1>
            </div>

            <div className="quizzes">
                <form>
                    {quiz}
                    <button type="submit"> submit quiz</button>
                </form>
            </div>
        </div>
    )
}
