import "../Quiz.css";
import { useNavigate } from 'react-router-dom';
export default function Addquiz() {
    // quizzes ophalen van database

    const navigate = useNavigate();
    const questions: { id: string, question: string, ans1: string, ans2: string, ans3: string, ans4: string, correct: string }[] = [];

    const quiz = questions.map((question) => {
        if (questions.length > 1) {

            return(
                < div key = { question.id } >
                <p>{question.question}</p>
                <div id={question.id.toString()} className="answers">

                    <input name={question.id.toString()} type="radio" value={question.ans1}></input>{question.ans1} <br></br>
                    <input name={question.id.toString()} type="radio" value={question.ans2}></input>{question.ans2} <br></br>
                    <input name={question.id.toString()} type="radio" value={question.ans3}></input>{question.ans3} <br></br>
                    <input name={question.id.toString()} type="radio" value={question.ans4}></input>{question.ans4} <br></br>

                </div>
            </div >
            )
            
        }
        else {
            return (
            <div>
                <p>No questions yet</p>
            </div>
            )
            
        }
    });

    function AddQuestion() {
        const q = document.getElementById("q") as HTMLInputElement;
        const a1 = document.getElementById("a1") as HTMLInputElement;
        const a2 = document.getElementById("a2") as HTMLInputElement;
        const a3 = document.getElementById("a3") as HTMLInputElement;
        const a4 = document.getElementById("a4") as HTMLInputElement;
        const q1 = document.getElementById("q") as HTMLInputElement;



        questions.push({

            id: questions.length.toString(),
            question: q.value,
            ans1: a1.value,
            ans2: a2.value,
            ans3: a3.value,
            ans4: a4.value,
            correct: ""
        });

    }

    return (
        <div>
            <div>
                {quiz}
            </div>

            <div>
                <input id="q" className="Gotoquizbutton" placeholder="question"></input> <br></br>
               A <input id="a1" className="Gotoquizbutton" placeholder="answer"></input>
               B <input id="a2" className="Gotoquizbutton" placeholder="answer"></input> <br></br>
               C <input id="a3" className="Gotoquizbutton" placeholder="answer"></input>
               D <input id="a4" className="Gotoquizbutton" placeholder="answer"></input> <br></br>
                <button onClick={AddQuestion} className="Gotoquizbutton">add a question</button>
            </div>
            
        </div>
    )
}
