import "./UserQuiz.css";

function openQuiz1() {
    const x = document.getElementById("desc1") as HTMLElement;
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
    
}
function openQuiz2() {
    const x = document.getElementById("desc2") as HTMLElement;
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }

}
function openQuiz3() {
    const x = document.getElementById("desc3") as HTMLElement;
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
                <button onClick={ openQuiz1} className="quizbanner">
                 Quiz1
                </button>
                <div id="desc1" className="quizdescription">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Laoreet sit amet cursus sit amet. Aliquam ut porttitor
                        leo a diam sollicitudin tempor id. Condimentum vitae sapien pellentesque
                        habitant morbi tristique senectus et netus. Ultrices in iaculis nunc
                        sed augue lacus viverra vitae. Dis parturient montes nascetur ridiculus
                        mus mauris vitae. Suscipit adipiscing bibendum est ultricies integer quis.
                        Facilisis volutpat est velit egestas dui id ornare arcu. Pretium fusce id velit
                        ut tortor pretium viverra. Integer eget aliquet nibh praesent. Ut ornare lectus sit amet.
                        Vitae nunc sed velit dignissim sodales ut. Augue ut lectus arcu bibendum at varius vel pharetra.
                        Et malesuada fames ac turpis egestas sed tempus. Eu nisl nunc mi ipsum faucibus vitae aliquet nec.
                    </p>
                    
                    <button className="Gotoquizbutton">
                        Make Quiz
                    </button>
                </div>
                

                <button onClick={openQuiz2} className="quizbanner">
                    Quiz2
                </button>
                <div id="desc2" className="quizdescription">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Laoreet sit amet cursus sit amet. Aliquam ut porttitor
                        leo a diam sollicitudin tempor id. Condimentum vitae sapien pellentesque
                        habitant morbi tristique senectus et netus. Ultrices in iaculis nunc
                        sed augue lacus viverra vitae. Dis parturient montes nascetur ridiculus
                        mus mauris vitae. Suscipit adipiscing bibendum est ultricies integer quis.
                        Facilisis volutpat est velit egestas dui id ornare arcu. Pretium fusce id velit
                        ut tortor pretium viverra. Integer eget aliquet nibh praesent. Ut ornare lectus sit amet.
                        Vitae nunc sed velit dignissim sodales ut. Augue ut lectus arcu bibendum at varius vel pharetra.
                        Et malesuada fames ac turpis egestas sed tempus. Eu nisl nunc mi ipsum faucibus vitae aliquet nec.
                    </p>

                    <button className="Gotoquizbutton">
                        Make Quiz
                    </button>
                </div>
                <button onClick={openQuiz3} className="quizbanner">
                    Quiz3
                </button>
                <div id="desc3" className="quizdescription">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Laoreet sit amet cursus sit amet. Aliquam ut porttitor
                        leo a diam sollicitudin tempor id. Condimentum vitae sapien pellentesque
                        habitant morbi tristique senectus et netus. Ultrices in iaculis nunc
                        sed augue lacus viverra vitae. Dis parturient montes nascetur ridiculus
                        mus mauris vitae. Suscipit adipiscing bibendum est ultricies integer quis.
                        Facilisis volutpat est velit egestas dui id ornare arcu. Pretium fusce id velit
                        ut tortor pretium viverra. Integer eget aliquet nibh praesent. Ut ornare lectus sit amet.
                        Vitae nunc sed velit dignissim sodales ut. Augue ut lectus arcu bibendum at varius vel pharetra.
                        Et malesuada fames ac turpis egestas sed tempus. Eu nisl nunc mi ipsum faucibus vitae aliquet nec.
                    </p>

                    <button className="Gotoquizbutton">
                        Make Quiz
                    </button>
                </div>
            </div>
            
        </div>

    )
}