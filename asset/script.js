//timer


//reduce time when question answered wrong


//pull up questions when start button clicked


//check corret answer


//move to the next question after question answered 


//save highscore


//hide and unhide sections

var qindex =0;

var startbutton = document.getElementById("startbutton")

function quizStart() {
    //hide the start screen
    //unhide the questions screen
    //start the timer interval
    //get a question
}

var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language","","","",],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Casscading style sheet", "a breakfast menu","a type of buger",""],
        answer: "Casscading style sheet"
    },
    {
        question: "Commonly use data types includes",
        choices: ["Strings","Boolean","Integer","All of the above"],
        answer: "All of the above"
    }
]

startbutton.onclick = quizStart;